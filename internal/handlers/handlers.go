package handlers

import (
	"github.com/SerjLeo/mlf_backend/pkg/cache"
	"github.com/SerjLeo/mlf_backend/pkg/email"
	"github.com/SerjLeo/mlf_backend/pkg/templates"
	"github.com/go-chi/chi/v5"
	"net/http"
)

type Handler struct {
	MailManager     email.MailManager
	TemplateManager templates.TemplateManager
	TargetEmail     string
	Cache           *cache.Cache
}

type HandlerConfig struct {
	MailManager     email.MailManager
	TemplateManager templates.TemplateManager
	TargetEmail     string
	Cache           *cache.Cache
}

func NewHandler(config HandlerConfig) *Handler {
	return &Handler{
		MailManager:     config.MailManager,
		TemplateManager: config.TemplateManager,
		TargetEmail:     config.TargetEmail,
		Cache:           config.Cache,
	}
}

func (h *Handler) InitRouter() http.Handler {
	mux := chi.NewRouter()

	mux.Post("/send-form", h.sendForm)

	fileServer := http.FileServer(http.Dir("./static"))
	mux.Handle("/*", fileServer)
	return mux
}
