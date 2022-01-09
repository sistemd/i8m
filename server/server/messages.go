package server

import "github.com/ennmichael/i8m/server/game"

// messageForClient is a message that gets sent from the server to the client.
// This type is designed to be encoded into JSON.
type messageForClient struct {
	ID      *string         `json:"id,omitempty"`
	Game    *gameMessage    `json:"game,omitempty"`
	Terrain *terrainMessage `json:"terrain,omitempty"`
}

// messageFromClient is a message that gets sent from the client to the server.
// This type will typically be decoded from JSON.
type messageFromClient struct {
	FetchTerrain *bool          `json:"fetchTerrain"`
	Direction    *vectorMessage `json:"direction"`
	Rail         *struct {
		Direction vectorMessage `json:"direction"`
	} `json:"rail"`
}

type terrainMessage struct {
	Polygons []polygonMessage `json:"polygons"`
}

type polygonMessage struct {
	Points []vectorMessage `json:"points"`
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
	Radius      float64       `json:"radius"`
}

type railMessage struct {
	Start  vectorMessage `json:"start"`
	Offset vectorMessage `json:"offset"`
}

func toGameMessage(game *game.Engine) *gameMessage {
	return &gameMessage{
		Players: toPlayerMessages(game.Players()),
	}
}

func toTerrainMessage(terrain game.Terrain) *terrainMessage {
	var polygons []polygonMessage
	for _, polygon := range terrain.Polygons {
		polygons = append(polygons, toPolygonMessage(polygon))
	}
	return &terrainMessage{Polygons: polygons}
}

func toPolygonMessage(polygon game.Polygon) polygonMessage {
	var points []vectorMessage
	for _, point := range polygon.Points {
		points = append(points, toVectorMessage(point))
	}
	return polygonMessage{Points: points}
}

func toVectorMessage(vector game.Vector) vectorMessage {
	return vectorMessage{
		X: vector.X,
		Y: vector.Y,
	}
}

func fromVectorMessage(msg vectorMessage) game.Vector {
	return game.Vector{
		X: msg.X,
		Y: msg.Y,
	}
}

func toPlayerMessage(player game.Player) playerMessage {
	return playerMessage{
		Position:    toVectorMessage(player.Position()),
		Direction:   toVectorMessage(player.Direction.Vector()),
		Skin:        player.Skin,
		RespawnTime: player.RespawnTime,
		Radius:      player.Radius,
	}
}

func toPlayerMessages(players map[game.PlayerID]game.Player) map[string]playerMessage {
	result := make(map[string]playerMessage)
	for id, player := range players {
		result[string(id)] = toPlayerMessage(player)
	}
	return result
}
