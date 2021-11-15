package handlers

import (
	"encoding/json"
	"fmt"
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/helpers"
	"github.com/SerjLeo/SpanglishTutorOrigin/internal/models"
	"github.com/SerjLeo/mlf_backend/pkg/email"
	"html/template"
	"net/http"
	"time"
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

	token, err := h.TokenManager.GenerateToken(result.Id, time.Hour * 2400)
	if err != nil {
		errorResponse(w, http.StatusInternalServerError, "Ошибка при отправке формы. Повторите попытку позже.")
		return
	}

	templateData := struct {
		*models.Feedback
		ActivationURL string
	}{
		result, fmt.Sprintf("http://%s/activate-feedback?token=%s", h.HostURL, token),
	}


	bodyString, err := h.TemplateManager.ExecuteTemplateToString(sendFeedbackTemplate, templateData)
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

func (h *Handler) activateFeedback(w http.ResponseWriter, r *http.Request) {
	activateFeedbackTemplate, exist := h.Cache.Templates["feedbackEmail.html"]

	if !exist {
		errorResponse(w, http.StatusInternalServerError, "Ошибка при отправке формы. Повторите попытку позже.")
		return
	}

	token := r.URL.Query().Get("token")

	if len(token) == 0 {
		h.sendFeedbackActivationTemplate(w, activateFeedbackTemplate,"Нет токена активации.")
		return
	}

	tokenData, err := h.TokenManager.ParseToken(token)
	if err != nil {
		h.sendFeedbackActivationTemplate(w, activateFeedbackTemplate,"Срок действия токена истек.")
		return
	}

	feedbackId, ok := tokenData.TokenData.(int)
	if !ok {
		h.sendFeedbackActivationTemplate(w, activateFeedbackTemplate,"Неверный формат токена.")
		return
	}

	err = h.Repo.ActivateFeedback(feedbackId)
	if err != nil {
		h.sendFeedbackActivationTemplate(w, activateFeedbackTemplate,"Ошибка при активации токена.")
		return
	}

	h.sendFeedbackActivationTemplate(w, activateFeedbackTemplate,"Отзыв успешно активирован!")
}

func (h *Handler) sendFeedbackActivationTemplate(w http.ResponseWriter, template *template.Template, message string) {
	templateData := struct {
		Message string
	}{message}

	template.Execute(w, templateData)
}