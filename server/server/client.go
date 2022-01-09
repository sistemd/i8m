package server

import (
	"log"

	"github.com/ennmichael/i8m/server/engine"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

// TODO I would like to have a communication module instead of this somewhat odd client module

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
			if message.FetchTerrain != nil && *message.FetchTerrain == true {
				log.Printf("Return the static terrain")
				//c.sendMessage()
			}
			if message.Direction != nil {
				log.Printf("Received direction update message (%v, %v)", message.Direction.X, message.Direction.Y)
				c.engine.SetPlayerDirection(c.id, fromVectorMessage(*message.Direction))
			}
			if message.Rail != nil {
				log.Printf("Received rail fire message (%v, %v)", message.Rail.Direction.X, message.Direction.Y)
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
	id := string(c.id)
	c.sendMessage(&messageForClient{ID: &id})
}
