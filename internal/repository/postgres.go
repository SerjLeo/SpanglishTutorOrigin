package repository

import (
	"fmt"
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/config"
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/models"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type PostgresDB struct {
	db *sqlx.DB
}

func (r *PostgresDB) CreateFeedback(*models.Feedback) (*models.Feedback, error) {
	return nil, nil
}

func (r *PostgresDB) GetFeedbackList() []models.Feedback {
	return nil
}

const (
	feedbackTable = "feedback"
)

func NewPostgresDB(cfg config.AppConfig) (*sqlx.DB, error) {
	fmt.Println(cfg.Postgres.Host, cfg.Postgres.Port)
	db, err := sqlx.Open("postgres", fmt.Sprintf("host=%s port=%s dbname=%s user=%s password=%s sslmode=%s",
		cfg.Postgres.Host, cfg.Postgres.Port, cfg.Postgres.Dbname, cfg.Postgres.Username, cfg.Postgres.Password, cfg.Postgres.Sslmode))
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}
