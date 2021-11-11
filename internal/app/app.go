package app

import (
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/config"
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/handlers"
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/models"
	"github.com/SerjLeo/mlf_backend/pkg/cache"
	"github.com/SerjLeo/mlf_backend/pkg/email/smtp"
	"github.com/SerjLeo/mlf_backend/pkg/templates"
	"github.com/pkg/errors"
	"log"
)

func RunApp() {
	appConfig, err := config.InitConfig(".")
	if err != nil {
		log.Fatal(errors.Wrap(err, "Error while reading config").Error())
	}
	port := appConfig.Http.Port
	mailManager, err := smtp.NewSMTPSender(
		appConfig.SMTP.Host,
		appConfig.SMTP.Pass,
		appConfig.SMTP.Port,
		appConfig.SMTP.From,
	)
	if err != nil {
		log.Fatal(errors.Wrap(err, "Error while creating mail manager").Error())
	}

	templateManager := templates.NewStandardTemplatesManager(appConfig.TemplatesPath)
	tmpls, err := templateManager.ParseTemplates()
	if err != nil {
		log.Fatal(err.Error())
	}
	appCache := cache.NewCache(tmpls)

	handler := handlers.NewHandler(handlers.HandlerConfig{
		MailManager: mailManager,
		TemplateManager: templateManager,
		Cache: appCache,
		TargetEmail: appConfig.SMTP.Target,
	})
	server := models.Server{}

	if err := server.Run(port, handler.InitRouter()); err != nil {
		log.Fatal(errors.Wrap(err, "Error while running server").Error())
	}
}
