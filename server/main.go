package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/ennmichael/i8m/server/engine"
	"github.com/gorilla/websocket"
)

const staticFilesRoot = "../client/dist"

// Client represents a client talking to the server.
type Client struct {
	player engine.Player
	conn   *websocket.Conn
}

func (c *Client) sendPlayer() {
	c.conn.WriteJSON(c.player.Position)
}

func (c *Client) handleConn() {
	for {
		var p engine.Position
		err := c.conn.ReadJSON(&p)
		if err != nil {
			return
		}
		c.player.Position = p
		fmt.Printf("%#v\n", p)
	}
}

func main() {
	var client Client
	var upgrader websocket.Upgrader

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		defer r.Body.Close()
		if websocket.IsWebSocketUpgrade(r) {
			conn, err := upgrader.Upgrade(w, r, nil)
			if err != nil {
				log.Print(err)
				return
			}

			if client.conn != nil {
				client.conn.Close()
			}
			client.conn = conn
			client.sendPlayer()
			go client.handleConn()
			return
		}

		if r.URL.Path == "/" {
			http.ServeFile(w, r, staticFilesRoot+"/index.html")
		} else {
			http.ServeFile(w, r, staticFilesRoot+r.URL.Path)
		}
	})

	http.ListenAndServe(":8080", nil)
}
