package server

import (
	"log"

	"github.com/ennmichael/i8m/server/engine"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type client struct {
	id       engine.PlayerID
	messages chan messageFromClient
	engine   *engine.Engine
	conn     *websocket.Conn
}

func newClient(e *engine.Engine, conn *websocket.Conn) *client {
	c := &client{
		id:       engine.PlayerID(uuid.New().String()),
		messages: make(chan messageFromClient, 20),
		engine:   e,
		conn:     conn,
	}
	go c.listenForMessages()
	return c
}

// listenForMessages listens on the opened websocket
// connection for client input.
func (c *client) listenForMessages() {
	for {
		var m messageFromClient
		err := c.conn.ReadJSON(&m)
		if err != nil {
			err = c.conn.Close()
			if err != nil {
				log.Printf("failed to close a connection: %v", err)
			}
			c.conn = nil
			return
		}
		c.messages <- m
	}
}

// handleMessages updates the client direction based on his input.
func (c *client) handleMessages(engine *engine.Engine) {
Loop:
	for {
		select {
		case message := <-c.messages:
			if message.Direction != nil {
				c.engine.SetPlayerDirection(c.id, fromVectorMessage(*message.Direction))
			}
			if message.Rail != nil {
				engine.FireRail(c.id, fromVectorMessage(message.Rail.Direction))
			}
		default:
			break Loop
		}
	}
}

func (c *client) sendMessage(msg *messageForClient) {
	err := c.conn.WriteJSON(msg)
	if err != nil {
		log.Printf("Error while sending JSON state message %v", err)
	}
}

func (c *client) sendGameStateMessage(engine *engine.Engine) {
	c.sendMessage(&messageForClient{Game: toGameMessage(engine)})
}

func (c *client) sendIDMessage() {
	c.sendMessage(&messageForClient{ID: string(c.id)})
}
