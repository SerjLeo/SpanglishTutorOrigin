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

type feedbackInput struct {
	Feedback models.Feedback `json:"feedback"`
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

	token, err := h.TokenManager.GenerateToken(result.Id, time.Hour*2400)
	if err != nil {
		errorResponse(w, http.StatusInternalServerError, "Ошибка при отправке формы. Повторите попытку позже.")
		return
	}

	deleteToken, err := h.TokenManager.GenerateToken(result.Id, time.Hour*24000000)
	if err != nil {
		errorResponse(w, http.StatusInternalServerError, "Ошибка при отправке формы. Повторите попытку позже.")
		return
	}

	templateData := struct {
		*models.Feedback
		ActivationURL string
		DeleteURL     string
	}{
		result, fmt.Sprintf("https://%s/activate-feedback?token=%s", h.HostURL, token), fmt.Sprintf("https://%s/delete-feedback?token=%s", h.HostURL, deleteToken),
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
	activateFeedbackTemplate, exist := h.Cache.Templates["feedbackActivation.html"]

	if !exist {
		errorResponse(w, http.StatusInternalServerError, "Ошибка при отправке формы. Повторите попытку позже.")
		return
	}

	token := r.URL.Query().Get("token")

	if len(token) == 0 {
		h.sendFeedbackTemplate(w, activateFeedbackTemplate, "Нет токена активации.")
		return
	}

	tokenData, err := h.TokenManager.ParseToken(token)
	if err != nil {
		h.sendFeedbackTemplate(w, activateFeedbackTemplate, "Срок действия токена истек.")
		return
	}

	feedbackId, ok := tokenData.TokenData.(float64)
	if !ok {
		h.sendFeedbackTemplate(w, activateFeedbackTemplate, "Неверный формат токена.")
		return
	}

	err = h.Repo.ActivateFeedback(int(feedbackId))
	if err != nil {
		h.sendFeedbackTemplate(w, activateFeedbackTemplate, "Ошибка при активации токена.")
		return
	}

	h.sendFeedbackTemplate(w, activateFeedbackTemplate, "Отзыв успешно активирован!")
}

func (h *Handler) deleteFeedback(w http.ResponseWriter, r *http.Request) {
	activateFeedbackTemplate, exist := h.Cache.Templates["feedbackActivation.html"]

	if !exist {
		errorResponse(w, http.StatusInternalServerError, "Ошибка при отправке формы. Повторите попытку позже.")
		return
	}

	token := r.URL.Query().Get("token")

	if len(token) == 0 {
		h.sendFeedbackTemplate(w, activateFeedbackTemplate, "Нет токена активации.")
		return
	}

	tokenData, err := h.TokenManager.ParseToken(token)
	if err != nil {
		h.sendFeedbackTemplate(w, activateFeedbackTemplate, "Срок действия токена истек.")
		return
	}

	feedbackId, ok := tokenData.TokenData.(float64)
	if !ok {
		h.sendFeedbackTemplate(w, activateFeedbackTemplate, "Неверный формат токена.")
		return
	}

	err = h.Repo.DeleteFeedback(int(feedbackId))
	if err != nil {
		h.sendFeedbackTemplate(w, activateFeedbackTemplate, "Ошибка при активации токена.")
		return
	}

	h.sendFeedbackTemplate(w, activateFeedbackTemplate, "Отзыв успешно удален!")
}

func (h *Handler) sendFeedbackTemplate(w http.ResponseWriter, template *template.Template, message string) {
	templateData := struct {
		Message string
	}{message}

	template.Execute(w, templateData)
}

func (h *Handler) feedbackList(w http.ResponseWriter, r *http.Request) {
	feedbacks, err := h.Repo.GetFeedbackList()
	if err != nil {
		errorResponse(w, http.StatusInternalServerError, "Ошибка при получении списка отзывов.")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(successPayload{Data: feedbacks})
}
