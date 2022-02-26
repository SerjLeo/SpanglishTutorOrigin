import {QuestionVariant, ValidatorService, ViewService} from "./types";
import {questions, variants} from "./entities/questions";

export default class View implements ViewService {
    questions: string[] = questions
    variants: Array<Array<QuestionVariant>> = variants

    constructor(private validator: ValidatorService) {}

    renderForm(renderContainer: HTMLElement) {
        renderContainer.innerHTML = `
        <div class="modal-form">
            <div class="form-text">
                <h2>Успей записаться на занятие!</h2>
                <p>Если вы знаете языки, вы везде будете как дома.</p>
                <div class="form__error-container">
                    <div class="form-validation-error"></div>
                </div>
                <form id="inquirer-form" class="common-form">
                    <input type="text" name="name" placeholder="Имя" maxlength="60">
                    <input type="text" name="phone" placeholder="+7 (999) 999-99-99" maxlength="60">
                    <input type="text" name="email" placeholder="E-mail" maxlength="60">
                    <div class="select__wrap custom-select">
                        <div class="select-arrow">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>
                        </div>
                        <select name="language">
                            <option value="" disabled selected hidden>Выберите язык</option>
                            <option value="eng">Английский</option>
                            <option value="esp">Испанский</option>
                            <option value="both">Оба</option>
                        </select>
                    </div>
                    
                    <textarea name="goals" id="" cols="10" rows="5" placeholder="Ваши цели"></textarea>
                    <button type="submit">Записаться на занятие</button>
                </form>
            </div>
        </div>`
    }

    renderFeedbackForm(renderContainer: HTMLElement) {
        renderContainer.innerHTML = `
        <div class="feedback-form__wrap">
            <h2 class="feedback-form__title">Оставьте отзыв</h2>
            <div class="feedback-validation-error"></div>
            <form action="" id="feedback-form" class="feedback-form common-form">
                <input type="text" name="name" placeholder="Имя" maxlength="60">
                <div class="select__wrap custom-select">
                    <div class="select-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>
                    </div>
                    <select name="lang">
                        <option value="" disabled selected hidden>Выберите язык</option>
                        <option value="eng">Английский</option>
                        <option value="esp">Испанский</option>
                        <option value="both">Оба</option>
                    </select>
                </div>
                <textarea name="text" id="" cols="10" rows="5" placeholder="Ваш отзыв"></textarea>
                <button type="submit">Отправить отзыв</button>
            </form>
        </div>`
    }
}
