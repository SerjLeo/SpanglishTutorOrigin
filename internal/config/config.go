package config

import (
	"github.com/joho/godotenv"
	"github.com/spf13/viper"
	"os"
)

type AppConfig struct {
	Http struct {
		Port string
	}
	Env      string
	Postgres struct {
		Host     string
		Port     string
		Username string
		Dbname   string
		Sslmode  string
		Password  string
	}
	SMTP struct {
		Host   string
		Port   string
		Pass   string
		From   string
		Target string
	}
	TemplatesPath string
}

func InitConfig(configDir string) (*AppConfig, error) {
	viper.AddConfigPath(configDir)
	viper.SetConfigName("config")

	if err := viper.ReadInConfig(); err != nil {
		return nil, err
	}

	var cfg AppConfig

	if err := viper.Unmarshal(&cfg); err != nil {
		return nil, err
	}

	if err := populateEnv(&cfg); err != nil {
		return nil, err
	}

	return &cfg, nil
}

func populateEnv(cfg *AppConfig) error {
	if err := godotenv.Load(); err != nil {
		return err
	}

	if smtpPort, exists := os.LookupEnv("SMTP_TARGET"); exists {
		cfg.SMTP.Target = smtpPort
	}

	if smtpPass, exists := os.LookupEnv("SMTP_PASSWORD"); exists {
		cfg.SMTP.Pass = smtpPass
	}

	if smtpFrom, exists := os.LookupEnv("SMTP_FROM"); exists {
		cfg.SMTP.From = smtpFrom
	}

	if postgresPass, exists := os.LookupEnv("POSTGRES_PASS"); exists {
		cfg.Postgres.Password = postgresPass
	}

	if postgresHost, exists := os.LookupEnv("POSTGRES_HOST"); exists {
		cfg.Postgres.Host = postgresHost
	}

	return nil
}
