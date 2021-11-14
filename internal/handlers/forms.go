package handlers

import (
	"encoding/json"
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/helpers"
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/models"
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

type feedbackInput struct {
	Feedback  models.Feedback `json:"feedback"`
}

func (h *Handler) sendFeedback(w http.ResponseWriter, r *http.Request) {
	var f feedbackInput

	if err := json.NewDecoder(r.Body).Decode(&f); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		errorResponse(w, http.StatusBadRequest, "Неверный формат данных.")
		return
	}

	result, err := h.Repo.CreateFeedback(&f.Feedback)
	if err != nil {
		errorResponse(w, http.StatusInternalServerError, "Ошибка при сохранении отзыва. Повторите попытку позже.")
		return
	}

	result.Lang = helpers.LangVocabulary(result.Lang)
	sendFeedbackTemplate, exist := h.Cache.Templates["feedbackEmail.html"]
	if !exist {
		errorResponse(w, http.StatusInternalServerError, "Ошибка при отправке формы. Повторите попытку позже.")
		return
	}

	bodyString, err := h.TemplateManager.ExecuteTemplateToString(sendFeedbackTemplate, result)
	if err != nil {
		errorResponse(w, http.StatusInternalServerError, "Ошибка при отправке формы. Повторите попытку позже.")
		return
	}

	input := email.SendInput{
		To:      h.TargetEmail,
		Body:    bodyString,
		Subject: "Оставлен отзыв",
	}
	if err := h.MailManager.SendEmail(input); err != nil {
		errorResponse(w, http.StatusInternalServerError, "Ошибка при отправке формы. Повторите попытку позже.")
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(successPayload{Data: "Отзыв оставлен, спасибо!"})
}