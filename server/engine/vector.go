package engine

// Vector is a free 2D vector.
type Vector struct {
	X float64 `json:"x"`
	Y float64 `json:"y"`
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
