import {AlertService, ValidatorService} from "./types";

export default class Validator implements ValidatorService {

    constructor(private readonly alert: AlertService) {
    }

    validateForm(form: HTMLFormElement, errorTarget: string): boolean {
        let isEmpty = false
        let emptyFields = ''
        let isLong = false
        const keysVocabulary: Record<string, string> = {
            name: 'имя',
            phone: 'телефон',
            email: 'email',
            language: 'язык',
            lang: 'язык',
            goals: 'цели',
            text: 'отзыв',
        }
        let data = new FormData(form)
        if(!Array.from(data.keys()).includes('language') && !Array.from(data.keys()).includes('lang')) {
            isEmpty = true;
            emptyFields += ' язык,'
        }
        for (const [key, value] of data.entries() as any) {
            if (!value.trim() && keysVocabulary[key]) {
                emptyFields += ' ' + keysVocabulary[key] + ','
                isEmpty = true
            }
            if (value.trim().length>60 && key !== 'goals'){
                this.alert.validationAlert(`Максимальная длина строки - 60 символов`, errorTarget)
                isLong = true
            }
        }
        if (isEmpty) this.alert.validationAlert(`Заполните, пожалуйста, поля:${emptyFields.slice(0,-1)}`, errorTarget)
        return !isEmpty && !isLong
    }
}
