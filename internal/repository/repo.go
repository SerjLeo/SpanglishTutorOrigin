package repository

import (
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/models"
	"github.com/jmoiron/sqlx"
)

type Repository interface {
	CreateFeedback(*models.Feedback) (*models.Feedback, error)
	GetFeedbackList() ([]models.Feedback, error)
	ActivateFeedback(id int) error
	DeleteFeedback(id int) error
}

func NewPostgresRepository(db *sqlx.DB) Repository {
	return &PostgresDB{db: db}
}