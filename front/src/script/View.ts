import {QuestionVariant, ValidatorService, ViewService} from "./types";
import {questions, variants} from "./entities/questions";

export default class View implements ViewService {
    questions: string[] = questions
    variants: Array<Array<QuestionVariant>> = variants

    constructor(private validator: ValidatorService) {
        this.renderTest = this.renderTest.bind(this)
    }

    renderForm(renderContainer: HTMLElement) {
        renderContainer.innerHTML = `
        <div class="modal-form">
            <div class="form-img"></div>
            <div class="form-text">
                <h2>Успей записаться на занятие!</h2>
                <p>Если вы знаете языки, вы везде будете как дома.</p>
                <div class="form-validation-error"></div>
                <form id="inquirer-form">
                    <input type="text" name="Имя" placeholder="Имя" maxlength="60">
                    <input type="text" name="Телефон" placeholder="+7 (999) 999-99-99" maxlength="60">
                    <input type="text" name="Email" placeholder="E-mail" maxlength="60">
                    <div class="select__wrap custom-select">
                        <div class="select-arrow">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>
                        </div>
                        
                    </div>
                    <select name="Язык">
                            <option value="" disabled selected hidden>Выберите язык</option>
                            <option value="eng">Английский</option>
                            <option value="esp">Испанский</option>
                            <option value="both">Оба</option>
                        </select>
                    <textarea name="Цели" id="" cols="10" rows="5" placeholder="Ваши цели"></textarea>
                    <button type="submit">Записаться на занятие</button>
                </form>
            </div>
        </div>`
    }

    renderTest(renderContainer: HTMLElement, step: number, checkedID: number) {
        if (step < 3) {
            renderContainer.innerHTML = `
            <div class="modal-form test-form">
                <div class="annotation">
                    <div class="annotation-text">Ответьте на несколько вопросов и получите пробное занятие Бесплатно!</div>
                    <div>${step + 1}/3</div>
                </div>
                <div class="progress-bar">
                    <div class="progress-bar-fill"></div>
                </div>
                <div class="form-text test-form-text">
                    <h2>${this.questions[step]}</h2>
                    <p>Выберите один вариант ответа</p>
                    <form id="test-form">
                        <div class="variants">
                        <label>
                            <input
                                id="1"
                                type="radio"
                                name="${this.questions[step]}"
                                value="${this.variants[step][0].text} 1"
                                ${checkedID === 1 ? 'checked' : null}
                            />
                            <div class="${this.variants[step][0].img} box">
                                <div class="box-filter"></div>
                            </div>
                            <div class="subtext">${this.variants[step][0].text}</div>
                        </label>
                        
                        <label>
                            <input
                                id="2"
                                type="radio"
                                name="${this.questions[step]}"
                                value="${this.variants[step][1].text} 2"
                                ${checkedID === 2 ? 'checked' : null}
                            />
                            <div class="${this.variants[step][1].img} box">
                                <div class="box-filter"></div>
                            </div>
                            <div class="subtext">${this.variants[step][1].text}</div>
                        </label>

                        <label>
                            <input
                                id="3"
                                type="radio"
                                name="${this.questions[step]}"
                                value="${this.variants[step][2].text} 3"
                                ${checkedID === 3 ? 'checked' : null}
                            />
                            <div class="${this.variants[step][2].img} box">
                                <div class="box-filter"></div>
                            </div>
                            <div class="subtext">${this.variants[step][2].text}</div>
                        </label>
                        </div>
                        <div class="buttons">
                            <button class="back" ${step === 0 ? 'disabled' : null}>&#129040; Назад</button>
                            <button class="submit-test" type="submit" ${checkedID === 0 ? 'disabled' : ''}>${step === 2 ? 'Последний вопрос' : 'Далее &#129042;'}</button>
                        </div>
                    </form>
                </div>
            </div>`
        } else {
            renderContainer.innerHTML = `
            <div class="modal-form test-form">
                <div class="annotation">
                    <div class="annotation-text">Благодарю за уделенное время!</div>
                </div>
                <div class="progress-bar">
                    <div class="progress-bar-fill"></div>
                </div>
                <div class="form-validation-error"></div>
                <div class="form-text">
                    <form id="test-form">
                        <input type="text" name="Имя" placeholder="Имя" maxlength="60">
                        <input type="text" name="Телефон" placeholder="+7 (999) 999-99-99" maxlength="60">
                        <input type="text" name="Email" placeholder="E-mail" maxlength="60">
                        <div class="buttons">
                            <button class="back">&#129040; Назад</button>
                            <button type="submit">Завершить</button>
                        </div>
                    </form>
                </div>
            </div>`
        }
        this.validator.validateTest()
    }

    registerListeners() {}
}
