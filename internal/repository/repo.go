package repository

import (
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/models"
	"github.com/jmoiron/sqlx"
)

type Repository interface {
	createFeedback(*models.Feedback) (*models.Feedback, error)
	getFeedbackList() []models.Feedback
}

func NewPostgresRepository(db *sqlx.DB) Repository {
	return &PostgresDB{db: db}
}