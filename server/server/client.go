package server

import (
	"github.com/ennmichael/i8m/server/engine"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type client struct {
	ID         string
	Directions chan engine.Vector
	Conn       *websocket.Conn
	Player     *engine.Player
}

func newClient(conn *websocket.Conn) *client {
	c := &client{
		ID:         uuid.New().String(),
		Conn:       conn,
		Directions: make(chan engine.Vector, 20),
		Player:     &engine.Player{},
	}
	go c.listenOnConnection()
	return c
}

// listenOnConnection listens on the opened websocket
// connection for client input.
func (c *client) listenOnConnection() {
	for {
		var p engine.Vector
		err := c.Conn.ReadJSON(&p)
		if err != nil {
			c.Conn.Close()
			return
		}
		c.Directions <- p
	}
}

// updatePlayerDirection updates the client direction based on his input.
func (c *client) updatePlayerDirection() {
Loop:
	for {
		select {
		case newDirection := <-c.Directions:
			c.Player.Direction = newDirection
		default:
			break Loop
		}
	}
}
