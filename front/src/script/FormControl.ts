import {AlertService, AnswerHandler, ApiService, EmptyHandler, FormControlService, ValidatorService} from "./types";

export default class FormControl implements FormControlService {
    private form: any = {}

    constructor(
      private readonly apiService: ApiService,
      private readonly validator: ValidatorService,
      private readonly alert: AlertService
    ) {}

    listenToForm(form: HTMLFormElement, title: string): void {
        form.addEventListener('submit', e => this.handleFormSubmit(e, form, title))
    }

    listenToTest(form: HTMLFormElement, title: string, submitHandler: EmptyHandler, backBtn: HTMLButtonElement, backHandler: EmptyHandler, step: number, answerHandler: AnswerHandler) {
        form.addEventListener('submit', (e: Event) => this.handleTestSubmit(e, form, title, submitHandler, step, answerHandler))
        backBtn.addEventListener('click', () => backHandler())
    }

    async handleFormSubmit(e: Event, form: HTMLFormElement, title: string) {
        e.preventDefault()
        if(!this.validator.validateForm(form)) return
        const formData = new FormData(form)
        const data: Record<string, any> = {}
        for (const [key, value] of formData.entries()){
            data[key] = value
        }
        await this.apiService.sendForm(data, title)
    }

    async handleTestSubmit(e: Event, form: HTMLFormElement, title: string, submitHandler: EmptyHandler, step: number, answerHandler: AnswerHandler) {
        e.preventDefault()
        const formData = new FormData(form)
        const data: Record<string, any> = {}
        for (const [key, value] of formData.entries()){
            data[key] = value
        }
        this.form[step] = data
        let id = 0
        for(let i in this.form[step]) {
            id = Number(this.form[step][i].substr(-1))
        }
        answerHandler(step, id)
        submitHandler()

        if(step === 3 && this.validator.validateForm(form)){
            await this.apiService.sendTest(this.form, title)
        }
    }


}
