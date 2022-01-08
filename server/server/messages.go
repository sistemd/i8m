package server

import "github.com/ennmichael/i8m/server/engine"

// messageForClient is a message that gets sent from the server to the client.
// This type is designed to be encoded into JSON.
type messageForClient struct {
	ID   string      `json:"id,omitempty"`
	Game gameMessage `json:"game,omitempty"`
}

// messageFromClient is a message that gets sent from the client to the server.
// This type will typically be decoded from JSON.
type messageFromClient struct {
	Direction *vectorMessage `json:"direction"`
	Rail      *struct {
		Direction vectorMessage `json:"direction"`
	} `json:"rail"`
}

type gameMessage struct {
	Players map[string]playerMessage `json:"players"`
	Rails   []railMessage            `json:"rails"`
}

type vectorMessage struct {
	X float64 `json:"x"`
	Y float64 `json:"y"`
}

type playerMessage struct {
	Position    vectorMessage `json:"position"`
	Direction   vectorMessage `json:"direction"`
	Skin        string        `json:"skin"`
	RespawnTime float64       `json:"respawnTime"`
}

type railMessage struct {
	Start  vectorMessage `json:"start"`
	Offset vectorMessage `json:"offset"`
}

func toGameMessage(engine *engine.Engine) gameMessage {
	return gameMessage{
		Players: toPlayerMessages(engine.Players()),
	}
}

func toVectorMessage(vector engine.Vector) vectorMessage {
	return vectorMessage{
		X: vector.X,
		Y: vector.Y,
	}
}

func fromVectorMessage(msg vectorMessage) engine.Vector {
	return engine.Vector{
		X: msg.X,
		Y: msg.Y,
	}
}

func toPlayerMessage(player engine.Player) playerMessage {
	return playerMessage{
		Position:    toVectorMessage(player.Position()),
		Direction:   toVectorMessage(player.Direction),
		Skin:        player.Skin,
		RespawnTime: player.RespawnTime,
	}
}

func toPlayerMessages(players map[engine.PlayerID]engine.Player) map[string]playerMessage {
	result := make(map[string]playerMessage)
	for id, player := range players {
		result[string(id)] = toPlayerMessage(player)
	}
	return result
}
