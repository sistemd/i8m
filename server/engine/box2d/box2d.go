package box2d

import (
	"github.com/ByteArena/box2d"
	"github.com/ennmichael/i8m/server/engine"
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

func (p Box2dPhysics) CreateTerrain(terrain engine.Terrain) {
}

func (p Box2dPhysics) CreateEntity(radius float64) engine.PhysicsEntity {
	bodyDef := box2d.MakeB2BodyDef()
	bodyDef.Type = box2d.B2BodyType.B2_kinematicBody
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

func (pe Box2dPhysicsEntity) SetVelocity(velocity engine.Vector) {
	pe.body.SetLinearVelocity(toBox2dVector(velocity))
}

func (pe Box2dPhysicsEntity) Position() engine.Vector {
	return fromBox2dVector(pe.body.GetPosition())
}

func toBox2dVector(vec engine.Vector) box2d.B2Vec2 {
	return box2d.MakeB2Vec2(vec.X, vec.Y)
}

func fromBox2dVector(vec box2d.B2Vec2) engine.Vector {
	return engine.Vector{X: vec.X, Y: vec.Y}
}
