package repository

import (
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/models"
	"github.com/jmoiron/sqlx"
)

type Repository interface {
	CreateFeedback(*models.Feedback) (*models.Feedback, error)
	GetFeedbackList() []models.Feedback
}

func NewPostgresRepository(db *sqlx.DB) Repository {
	return &PostgresDB{db: db}
}