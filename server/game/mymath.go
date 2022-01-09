package game

import "math"

// Vector is a free 2D vector.
type Vector struct {
	X float64
	Y float64
}

// NormalizedVector represents a normalized vector.
type NormalizedVector struct {
	vector Vector
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

// Intensity returns the intensity (length) of the vector.
func (v Vector) Intensity() float64 {
	return math.Sqrt(v.X*v.X + v.Y + v.Y)
}

// Normalized returns the normalized version of the vector, i.e. a new vector
// which points in the same direction, but has the length of 1.
func (v Vector) Normalized() NormalizedVector {
	a := v.Intensity()
	if a == 0 {
		return NormalizedVector{}
	}

	return NormalizedVector{
		vector: Vector{
			X: v.X / a,
			Y: v.Y / a,
		},
	}
}

// Vector returns the x and y values for this normalized vector.
func (n NormalizedVector) Vector() Vector {
	return n.vector
}

// Line represents a line.
type Line struct {
	Start  Vector
	Offset Vector
}

// Circle represents a circle.
type Circle struct {
	Center Vector
	Radius float64
}
