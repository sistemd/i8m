package box2d

import (
	"github.com/ByteArena/box2d"
	"github.com/ennmichael/i8m/server/game"
)

type Box2dPhysics struct {
	world *box2d.B2World
}

type Box2dPhysicsEntity struct {
	body *box2d.B2Body
}

func NewPhysics() Box2dPhysics {
	world := box2d.MakeB2World(box2d.B2Vec2{})
	return Box2dPhysics{
		world: &world,
	}
}

func (p Box2dPhysics) CreateTerrain(terrain game.Terrain) {
	staticBodyDef := box2d.MakeB2BodyDef()
	staticBodyDef.Type = box2d.B2BodyType.B2_kinematicBody
	staticBodyDef.Position.Set(0, 0)
	staticBody := p.world.CreateBody(&staticBodyDef)

	for _, polygon := range terrain.Polygons {
		vertices := toBox2dVectors(polygon.Points)
		chain := box2d.MakeB2ChainShape()
		chain.CreateLoop(vertices, len(vertices))
		staticBody.CreateFixture(&chain, 0)
	}
}

func (p Box2dPhysics) CreateEntity(radius float64) game.PhysicsEntity {
	bodyDef := box2d.MakeB2BodyDef()
	bodyDef.Type = box2d.B2BodyType.B2_dynamicBody
	bodyDef.Position.Set(0, 0)
	body := p.world.CreateBody(&bodyDef)

	shape := box2d.MakeB2CircleShape()
	shape.SetRadius(radius)

	fixtureDef := box2d.MakeB2FixtureDef()
	fixtureDef.Shape = shape
	fixtureDef.Density = 1.0
	fixtureDef.Friction = 0.3
	body.CreateFixtureFromDef(&fixtureDef)

	return Box2dPhysicsEntity{
		body,
	}
}

func (p Box2dPhysics) Update(timestep float64) {
	p.world.Step(timestep, 6, 2)
}

func (pe Box2dPhysicsEntity) SetVelocity(velocity game.Vector) {
	pe.body.SetLinearVelocity(toBox2dVector(velocity))
}

func (pe Box2dPhysicsEntity) Position() game.Vector {
	return fromBox2dVector(pe.body.GetPosition())
}

func toBox2dVector(vec game.Vector) box2d.B2Vec2 {
	return box2d.MakeB2Vec2(vec.X, vec.Y)
}

func toBox2dVectors(vecs []game.Vector) []box2d.B2Vec2 {
	var result []box2d.B2Vec2
	for _, vec := range vecs {
		result = append(result, toBox2dVector(vec))
	}
	return result
}

func fromBox2dVector(vec box2d.B2Vec2) game.Vector {
	return game.Vector{X: vec.X, Y: vec.Y}
}
