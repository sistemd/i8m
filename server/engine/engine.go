package engine

import "math/rand"

const maxRailLength = 500

const playerBoundingRadius = 10

const playerRespawnTimer = 3000 // milliseconds.

const railTimer = 1000

// Player represents a player in the game.
type Player struct {
	Position    Vector  `json:"position"`
	Direction   Vector  `json:"direction"`
	Skin        string  `json:"skin"`
	RespawnTime float64 `json:"respawnTime"`
	RailTime    float64 `json:"railTime"`
}

// Rail is a rail fired by a player.
type Rail struct {
	Line
	player    *Player
	processed bool
}

func (p *Player) dead() bool {
	return p.RespawnTime > 0
}

func (p *Player) die() {
	p.RespawnTime = playerRespawnTimer
}

// boundingCircle returns the bounding circle of the player.
func (p *Player) boundingCircle() Circle {
	return Circle{
		Center: p.Position,
		Radius: playerBoundingRadius,
	}
}

// NewPlayer creates a new player with a random skin.
func NewPlayer() *Player {
	skins := [...]string{"red", "green", "blue", "yellow", "orange", "purple"}
	return &Player{Skin: skins[rand.Int()%len(skins)]}
}

// move moves the player for distance d in his direction.
func (p *Player) move(d float64) {
	p.Position = p.Position.Translate(p.Direction.Scale(d))
}

// Game holds the game state.
type Game struct {
	Players map[string]*Player `json:"players"`
	Rails   []*Rail            `json:"rails"`
}

// Engine is the game engine. It holds the gameplay settings
// and the current game state.
type Engine struct {
	timestep    float64 // Engine timestep in milliseconds.
	playerSpeed float64 // Player speed in pixels per millisecond.
	Game        `json:"game"`
}

// NewEngine creates a new engine.
func NewEngine(timestep, playerSpeed float64) *Engine {
	return &Engine{
		timestep:    timestep,
		playerSpeed: playerSpeed,
		Game: Game{
			Players: make(map[string]*Player),
		},
	}
}

// Update advances the game engine state. deltaTime should be the time elapsed
// since the previous call to Update. This is required because the engine operates
// within fixed timesteps. The remaining time that doesn't fall within the timestep
// is returned. This value will always be smaller than e.timestep.
func (e *Engine) Update(deltaTime float64) (remainingTime float64) {
	reduceRailTime := func(p *Player) {
		p.RailTime -= deltaTime
		if p.RailTime < 0 {
			p.RailTime = 0
		}
	}

	reduceRespawnTime := func(p *Player) {
		p.RespawnTime -= deltaTime
		if p.RespawnTime < 0 {
			p.RespawnTime = 0
		}
	}

	for _, player := range e.Players {
		reduceRailTime(player)
		reduceRespawnTime(player)
	}

	playerHitsRail := func(player *Player) bool {
		for _, rail := range e.Rails {
			// Avoid players hitting themselves with rails
			if player == rail.player {
				continue
			}
			if rail.Intersects(player.boundingCircle()) {
				return true
			}
		}
		return false
	}

	updatePlayer := func(player *Player) {
		if player.dead() {
			return
		}
		player.move(e.playerSpeed * e.timestep)
		if playerHitsRail(player) {
			player.die()
		}
	}

	for deltaTime >= e.timestep {
		deltaTime -= e.timestep
		for _, player := range e.Players {
			updatePlayer(player)
		}
	}

	for _, rail := range e.Rails {
		rail.processed = true
	}

	return deltaTime
}

// AddPlayer adds a new player to the simulation.
func (e *Engine) AddPlayer(id string, p *Player) {
	e.Players[id] = p
}

// RemovePlayer removes a player from the simulation.
func (e *Engine) RemovePlayer(id string) {
	delete(e.Players, id)
}

// StateSent is called when the engine state is sent to the client.
// This allows the engine to clear all processed rails.
func (e *Engine) StateSent() {
	oldRails := e.Rails
	e.Rails = nil
	for _, rail := range oldRails {
		if !rail.processed {
			e.Rails = append(e.Rails, rail)
		}
	}
}

// FireRail causes player playerId to fire a rail in direction railDirection.
func (e *Engine) FireRail(playerId string, railDirection Vector) {
	player, ok := e.Players[playerId]
	if !ok || player.RailTime > 0 || player.dead() {
		return
	}
	player.RailTime = railTimer
	e.Rails = append(e.Rails, &Rail{
		Line: Line{
			Start: player.Position,
			// TODO Calculate Offset properly
			Offset: railDirection.Scale(maxRailLength),
		},
		player: player,
	})
}
