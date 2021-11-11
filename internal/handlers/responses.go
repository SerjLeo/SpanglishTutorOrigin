package handlers

import (
	"encoding/json"
	"net/http"
)

type errorPayload struct {
	Error string `json:"error"`
}

func errorResponse(w http.ResponseWriter, statusCode int, errMessage string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(errorPayload{Error: errMessage})
}
