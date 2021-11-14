package models

type Feedback struct {
	Id        int    `json:"id" db:"id"`
	Name      string `json:"name" db:"name"`
	Lang      string `json:"lang" db:"lang"`
	Text      string `json:"text" db:"text"`
	IsVisible bool   `json:"is_visible" db:"is_visible"`
	CreatedAt string `json:"created_at" db:"created_at"`
}
