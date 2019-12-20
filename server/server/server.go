package server

import (
	"log"
	"net/http"
	"time"

	"github.com/ennmichael/i8m/server/engine"
	"github.com/gorilla/websocket"
)

const serverMessagingTimeout = 10 * time.Millisecond

func mainLoop(newClients <-chan *client) {
	var dt float64
	var clients []*client
	engine := engine.NewEngine(1, 0.1)
	lastUpdate := time.Now()
	messageTimeout := time.Tick(serverMessagingTimeout)

	updateEngine := func() {
		now := time.Now()
		dt += float64(now.Sub(lastUpdate).Nanoseconds()) / 1e6
		dt = engine.Update(dt)
		lastUpdate = now
	}

	sendMessages := func() {
		for _, client := range clients {
			if client.conn == nil {
				engine.RemovePlayer(client.id)
				continue
			}
			client.sendGameStateMessage(engine)
			engine.StateSent()
		}
	}

	for {
		select {
		case newClient := <-newClients:
			// Right when a player connects, they are notified of their ID.
			newClient.sendIDMessage()
			engine.AddPlayer(newClient.id, newClient.player)
			clients = append(clients, newClient)
		case <-messageTimeout:
			sendMessages()
		default:
		}

		updateEngine()

		for _, client := range clients {
			client.handleMessages(engine)
		}
	}
}

// Start starts the game server. The server handles websocket connections to /
// by serving the client over an update loop. Otherwise, normal HTTP connections
// will serve static files from the staticFilesRoot folder. The path / will serve
// index.html from the staticFilesRoot folder.
func Start(staticFilesRoot string) {
	var upgrader websocket.Upgrader
	newClients := make(chan *client, 10) // XXX A more meaningful value for the buffer size?
	go mainLoop(newClients)

	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			err := r.Body.Close()
			if err != nil {
				log.Printf("failed to close request body: %v", err)
			}
		}()

		if websocket.IsWebSocketUpgrade(r) {
			conn, err := upgrader.Upgrade(w, r, nil)
			if err != nil {
				log.Printf("Failed to upgrade WebSocket connection: %v\n", err)
				return
			}
			newClients <- newClient(conn)
			return
		}

		if r.URL.Path == "/" {
			http.ServeFile(w, r, staticFilesRoot+"/index.html")
		} else {
			http.ServeFile(w, r, staticFilesRoot+r.URL.Path)
		}
	})

	err := http.ListenAndServe(":8080", mux)
	log.Fatalf("failed to start server: %v", err)
}
