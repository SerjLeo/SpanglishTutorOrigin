package handlers

import (
	"github.com/go-chi/chi/v5"
	"net/http"
)

type Handler struct {

}

func NewHandler() *Handler {
	return &Handler{}
}

func (h *Handler) InitRouter() http.Handler {
	mux := chi.NewRouter()

	fileServer := http.FileServer(http.Dir("./front/dist"))
	mux.Handle("/*", fileServer)

	return mux
}