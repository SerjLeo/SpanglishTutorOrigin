import {AlertService, ValidatorService} from "./types";

export default class Validator implements ValidatorService {

    constructor(private readonly alert: AlertService) {
    }

    validateForm(form: HTMLFormElement): boolean {
        let isEmpty = false
        let emptyFields = ''
        let isLong = false
        let data = new FormData(form)
        for (let entry of data as any) {
            if(!entry[1].trim()) {
                emptyFields += ' ' + entry[0].toLowerCase() + ','
                isEmpty = true
            }
            if(entry[1].trim().length>60){
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
