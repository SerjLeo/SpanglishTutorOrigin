package app

import (
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/config"
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/handlers"
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/models"
	"github.com/pkg/errors"
	"github.com/spf13/viper"
	"log"
)

func RunApp() {
	if err := config.InitConfig(); err != nil {
		log.Fatal(errors.Wrap(err, "Error while reading config").Error())
	}
	port := viper.GetString("http.port")
	handler := handlers.NewHandler()
	server := models.Server{}

	if err := server.Run(port, handler.InitRouter()); err != nil {
		log.Fatal(errors.Wrap(err, "Error while running server").Error())
	}
}
