package server

import (
	"log"

	"github.com/ennmichael/i8m/server/engine"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type client struct {
	id       string
	messages chan messageFromClient
	player   *engine.Player
	conn     *websocket.Conn
}

func newClient(conn *websocket.Conn) *client {
	c := &client{
		id:       uuid.New().String(),
		messages: make(chan messageFromClient, 20),
		player:   &engine.Player{},
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
			c.conn.Close()
			c.conn = nil
			return
		}
		c.messages <- m
	}
}

// handleMessages updates the client direction based on his input.
func (c *client) handleMessages() {
Loop:
	for {
		select {
		case message := <-c.messages:
			if message.Direction != nil {
				c.player.Direction = *message.Direction
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

func (c *client) sendStateMessage(state []byte) {
	c.sendMessage(&messageForClient{State: state})
}

func (c *client) sendIDMessage() {
	c.sendMessage(&messageForClient{ID: c.id})
}

// messageForClient is a message that gets sent from the server to the client.
// This type is designed to be encoded into JSON.
type messageForClient struct {
	ID    string `json:"id,omitempty"`
	State []byte `json:"state,omitempty"`
}

// messageFromClient is a message that gets sent from the client to the server.
// This type will typically be decoded from JSON.
type messageFromClient struct {
	Direction *engine.Vector
}
