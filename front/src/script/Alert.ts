import {AlertService, AlertTypes} from "./types";

export default class Alert implements AlertService {

    validationAlert(message: string) {
        const errorElement = document.querySelector('.form-validation-error');
        if (!errorElement) return;
        errorElement.innerHTML = `
            <div class="error-message">${message}</div>
        `
    }

    invokeAlert(message: string, type: AlertTypes = 'success') {
        const modalElement = document.querySelector('.modal');
        if(!modalElement) return;
        modalElement.innerHTML = '';
        const success = document.createElement('div');
        success.classList.add('success-alert');
        success.innerHTML = message;
        modalElement.appendChild(success);

        setTimeout(() => {
            modalElement.innerHTML = '';
            const rootModalElement = document.querySelector('.modal-root');
            if(!rootModalElement) return;
            rootModalElement.classList.remove('modal-active');
        }, 7000);
    }
}
