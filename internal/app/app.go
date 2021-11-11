package app

import (
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/config"
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/handlers"
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/models"
	"github.com/SerjLeo/mlf_backend/pkg/cache"
	"github.com/SerjLeo/mlf_backend/pkg/email/smtp"
	"github.com/SerjLeo/mlf_backend/pkg/templates"
	"github.com/pkg/errors"
	"github.com/spf13/viper"
	"log"
)

func RunApp() {
	if err := config.InitConfig(); err != nil {
		log.Fatal(errors.Wrap(err, "Error while reading config").Error())
	}
	port := viper.GetString("http.port")
	mailManager, err := smtp.NewSMTPSender(
		viper.GetString("smtp.host"),
		viper.GetString("smtp.password"),
		viper.GetString("smtp.port"),
		viper.GetString("smtp.from"),
	)
	if err != nil {
		log.Fatal(errors.Wrap(err, "Error while creating mail manager").Error())
	}

	templateManager := templates.NewStandardTemplatesManager(viper.GetString("templatesPath"))
	tmpls, err := templateManager.ParseTemplates()
	if err != nil {
		log.Fatal(err.Error())
	}
	appCache := cache.NewCache(tmpls)

	handler := handlers.NewHandler(handlers.HandlerConfig{
		MailManager: mailManager,
		TemplateManager: templateManager,
		Cache: appCache,
		TargetEmail: viper.GetString("smtp.target"),
	})
	server := models.Server{}

	if err := server.Run(port, handler.InitRouter()); err != nil {
		log.Fatal(errors.Wrap(err, "Error while running server").Error())
	}
}
