import {AlertService, ValidatorService} from "./types";

export default class Validator implements ValidatorService {

    constructor(private readonly alert: AlertService) {
    }

    validateForm(form: HTMLFormElement): boolean {
        let isEmpty = false
        let emptyFields = ''
        let isLong = false
        const keysVocabulary: Record<string, string> = {
            name: 'имя',
            phone: 'телефон',
            email: 'email',
            language: 'язык',
            goals: 'цели',
        }
        let data = new FormData(form)
        if(!Array.from(data.keys()).includes('language')) {
            isEmpty = true;
            emptyFields += ' язык,'
        }
        for (const [key, value] of data.entries() as any) {
            if (!value.trim() && keysVocabulary[key]) {
                emptyFields += ' ' + keysVocabulary[key] + ','
                isEmpty = true
            }
            if (value.trim().length>60 && key !== 'goals'){
                this.alert.validationAlert(`Максимальная длина строки - 60 символов`)
                isLong = true
            }
        }
        if (isEmpty) this.alert.validationAlert(`Заполните, пожалуйста, поля:${emptyFields.slice(0,-1)}`)
        return !isEmpty && !isLong
    }

    validateTest() {
        const inputs = document.querySelectorAll('input[type="radio"]')
        inputs.forEach(input => input.addEventListener('change',() => {
            const submitElement = document.querySelector<HTMLButtonElement>('.submit-test');
            if (!submitElement) return;
            submitElement.disabled = false;
        }))
    }
}
