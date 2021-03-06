package handlers

import (
	"encoding/json"
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/helpers"
	"github.com/SerjLeo/mlf_backend/pkg/email"
	"net/http"
)

type formStructure struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Goals    string `json:"goals"`
	Language string `json:"language"`
	Phone    string `json:"phone"`
}

type formInput struct {
	Form  formStructure `json:"form"`
	Title string        `json:"title"`
}

func (h *Handler) sendForm(w http.ResponseWriter, r *http.Request) {
	var f formInput

	if err := json.NewDecoder(r.Body).Decode(&f); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		errorResponse(w, http.StatusBadRequest, "Неверный формат данных.")
		return
	}

	f.Form.Language = helpers.LangVocabulary(f.Form.Language)
	sendFormTemplate, exist := h.Cache.Templates["formEmail.html"]
	if !exist {
		errorResponse(w, http.StatusInternalServerError, "Ошибка при отправке формы. Повторите попытку позже.")
		return
	}

	bodyString, err := h.TemplateManager.ExecuteTemplateToString(sendFormTemplate, f.Form)
	if err != nil {
		errorResponse(w, http.StatusInternalServerError, "Ошибка при отправке формы. Повторите попытку позже.")
		return
	}

	input := email.SendInput{
		To:      h.TargetEmail,
		Body:    bodyString,
		Subject: f.Title,
	}
	if err := h.MailManager.SendEmail(input); err != nil {
		errorResponse(w, http.StatusInternalServerError, "Ошибка при отправке формы. Повторите попытку позже.")
	}
}