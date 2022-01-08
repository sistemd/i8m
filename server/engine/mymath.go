package engine

import "math"

// Vector is a free 2D vector.
type Vector struct {
	X float64
	Y float64
}

// Scale returns a new vector scaled by n.
func (v Vector) Scale(n float64) Vector {
	return Vector{
		X: n * v.X,
		Y: n * v.Y,
	}
}

// Translate returns a new vector translated by a.
func (v Vector) Translate(a Vector) Vector {
	return Vector{
		X: a.X + v.X,
		Y: a.Y + v.Y,
	}
}

type Line struct {
	Start  Vector
	Offset Vector
}

func (l Line) Intersects(c Circle) bool {
	x1 := l.Start.X - c.Center.X
	x2 := l.Offset.X
	y1 := l.Start.Y - c.Center.Y
	y2 := l.Offset.Y

	// Quadratic equation
	a := x2*x2 + y2*y2
	b := 2 * (x1*x2 + y1*y2)
	c_ := x1*x1 + y1*y1 - c.Radius*c.Radius

	D := math.Sqrt(b*b - 4*a*c_)
	t1 := (-b + D) / (2 * a)
	t2 := (-b - D) / (2 * a)
	return t1 <= 1 || t2 <= 1
}

func (c Circle) Intersects(l Line) bool {
	return l.Intersects(c)
}

type Circle struct {
	Center Vector
	Radius float64
}
