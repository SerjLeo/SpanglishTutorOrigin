package handlers

import "net/http"

func (h *Handler) Home(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello"))
}