package engine

import (
	"math/rand"
	"time"
)

const playerBoundingRadius = 10

var playerRespawnTimer = 1500 * time.Millisecond

const railTimer = 1 * time.Second

type PhysicsEntity interface {
	Position() Vector
	SetVelocity(velocity Vector)
}

type Physics interface {
	CreateTerrain(terrain Terrain)
	CreateEntity(radius float64) PhysicsEntity
	Update(timestep float64)
}

// PlayerID uniquely identifies each player in the game.
type PlayerID string

// Player represents a player in the game.
type Player struct {
	Direction   Vector
	Skin        string
	Radius      float64
	RespawnTime float64
	railTime    float64
	entity      PhysicsEntity
}

// Rail is a rail fired by a player.
type Rail struct {
	Line
	player    *Player
	processed bool
}

type Terrain struct {
	Polygons []Polygon
}

type Polygon struct {
	Points []Vector
}

// TODO Start Using these
type Position Vector

// TODO NewDirection to ensure vector is normalized

type Direction Vector

func (p *Player) Position() Vector {
	return p.entity.Position()
}

func (p *Player) dead() bool {
	return p.RespawnTime > 0
}

func (p *Player) die() {
	p.RespawnTime = playerRespawnTimer.Seconds()
}

// boundingCircle returns the bounding circle of the player.
func (p *Player) boundingCircle() Circle {
	return Circle{
		Center: p.Position(),
		Radius: playerBoundingRadius,
	}
}

func newPlayer(entity PhysicsEntity) *Player {
	skins := [...]string{"red", "green", "blue", "yellow", "orange", "purple"}
	return &Player{Skin: skins[rand.Int()%len(skins)], entity: entity, Radius: playerBoundingRadius}
}

// Game holds the game state.
type game struct {
	players map[PlayerID]*Player
	rails   []*Rail
}

// TODO Remove the distinction between "game" and "engine" and leave just "game"

// Engine is the game engine. It holds the gameplay settings
// and the current game state.
type Engine struct {
	timestep    float64
	playerSpeed float64
	physics     Physics
	terrain     Terrain
	game
}

// NewEngine creates a new engine.
func NewEngine(timestep, playerSpeed float64, physics Physics, terrain Terrain) *Engine {
	physics.CreateTerrain(terrain)
	return &Engine{
		timestep:    timestep,
		playerSpeed: playerSpeed,
		terrain:     terrain,
		game: game{
			players: make(map[PlayerID]*Player),
		},
		physics: physics,
	}
}

// Update advances the game engine state. deltaTime should be the time elapsed
// since the previous call to Update. This is required because the engine operates
// within fixed timesteps. The remaining time that doesn't fall within the timestep
// is returned. This value will always be smaller than e.timestep.
func (e *Engine) Update(deltaTime float64) (remainingTime float64) {
	reduceRailTime := func(p *Player) {
		p.railTime -= deltaTime
		if p.railTime < 0 {
			p.railTime = 0
		}
	}

	reduceRespawnTime := func(p *Player) {
		p.RespawnTime -= deltaTime
		if p.RespawnTime < 0 {
			p.RespawnTime = 0
		}
	}

	for _, player := range e.players {
		reduceRailTime(player)
		reduceRespawnTime(player)
	}

	playerHitsRail := func(player *Player) bool {
		for _, rail := range e.rails {
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

		velocity := player.Direction.Scale(e.playerSpeed)
		player.entity.SetVelocity(velocity)

		if playerHitsRail(player) {
			player.die()
		}
	}

	for deltaTime >= e.timestep {
		deltaTime -= e.timestep

		for _, player := range e.players {
			updatePlayer(player)
		}

		e.physics.Update(e.timestep)
	}

	for _, rail := range e.rails {
		rail.processed = true
	}

	return deltaTime
}

// AddPlayer adds a new player to the simulation.
func (e *Engine) AddPlayer(id PlayerID) {
	entity := e.physics.CreateEntity(playerBoundingRadius)
	e.players[id] = newPlayer(entity)
}

// SetPlayerDirection sets the movement direction of player with the given id.
func (e *Engine) SetPlayerDirection(id PlayerID, newDirection Vector) {
	e.players[id].Direction = newDirection
}

// RemovePlayer removes a player from the simulation.
func (e *Engine) RemovePlayer(id PlayerID) {
	delete(e.players, id)
}

// PostUpdate should be called sometime after Update was called
// and the new game state has been observed. It will take care of
// things such as clearing unneeded rails from the game state.
func (e *Engine) PostUpdate() {
	oldRails := e.rails
	e.rails = nil
	for _, rail := range oldRails {
		if !rail.processed {
			e.rails = append(e.rails, rail)
		}
	}
}

// FireRail causes player playerId to fire a rail in direction railDirection.
func (e *Engine) FireRail(playerID PlayerID, railDirection Vector) {
	player, ok := e.players[playerID]
	if !ok || player.railTime > 0 || player.dead() {
		// TODO Log error? Do something
		return
	}
	player.railTime = railTimer.Seconds()
	e.rails = append(e.rails, &Rail{
		Line: Line{
			Start: player.Position(),
			// TODO Calculate Offset properly
			// TODO Should be a raycast... this is some bs
			Offset: railDirection.Scale(10),
		},
		player: player,
	})
}

// Players returns the observable state of all players in the game.
func (e *Engine) Players() map[PlayerID]Player {
	result := make(map[PlayerID]Player)
	for id, player := range e.game.players {
		result[id] = *player
	}
	return result
}

// Rails returns the observable state of all rails in the game.
func (e *Engine) Rails() []Rail {
	var result []Rail
	for _, rail := range e.game.rails {
		result = append(result, *rail)
	}
	return result
}

// Terrain returns the static terrain of the game.
func (e *Engine) Terrain() Terrain {
	var result Terrain
	for _, polygon := range e.terrain.Polygons {
		result.Polygons = append(result.Polygons, polygon)
	}
	return result
}
