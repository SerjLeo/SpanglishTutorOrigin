import {AlertConfig, AlertService, AlertTypes} from "./types";

const defaultConfig: Required<Omit<AlertConfig, 'message'>> = {
    type: 'success',
    rootSelector: '.modal',
    clearOnTimeout: true
}

export default class Alert implements AlertService {

    validationAlert(message: string, errorTarget: string) {
        const errorElement = document.querySelector(errorTarget);
        if (!errorElement) return;
        errorElement.innerHTML = `
            <div class="error-message">${message}</div>
        `
    }

    invokeModalAlert(message: string, config: AlertConfig = {}) {
        const cfg = {...defaultConfig, ...config};
        const alertElement = document.querySelector(cfg.rootSelector);
        if(!alertElement) return;
        alertElement.innerHTML = '';
        const success = document.createElement('div');
        success.classList.add('success-alert');
        success.innerHTML = message;
        alertElement.appendChild(success);

        if (cfg.clearOnTimeout) setTimeout(() => {
            alertElement.innerHTML = '';
            const rootModalElement = document.querySelector('.modal-root');
            if(!rootModalElement) return;
            rootModalElement.classList.remove('modal-active');
        }, 7000);
    }
}
