package repository

import (
	"fmt"
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/config"
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/models"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

const (
	feedbackTable = "feedback"
)

type PostgresDB struct {
	db *sqlx.DB
}

func (r *PostgresDB) CreateFeedback(feedback *models.Feedback) (*models.Feedback, error) {
	query := fmt.Sprintf(`INSERT into %s (name, lang, text) VALUES ($1, $2, $3) RETURNING *`, feedbackTable)
	row := r.db.QueryRow(query, feedback.Name, feedback.Lang, feedback.Text)
	result := &models.Feedback{}

	if err := row.Scan(&result.Id, &result.Name, &result.Lang, &result.Text, &result.IsVisible, &result.CreatedAt); err != nil {
		return result, err
	}
	return result, nil
}

func (r *PostgresDB) ActivateFeedback(id int) error {
	query := fmt.Sprintf(`UPDATE %s SET is_visible = true WHERE id=$1`, feedbackTable)
	_, err := r.db.Exec(query, id)
	return err
}

func (r *PostgresDB) GetFeedbackList() []models.Feedback {
	return nil
}

func NewPostgresDB(cfg config.AppConfig) (*sqlx.DB, error) {
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
