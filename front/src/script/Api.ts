import {AlertService, ApiService} from "./types";
import axios from "axios";
import {isAxiosError} from "./entities/typeGuards";

export default class Api implements ApiService {
    constructor(private readonly api_url: string, private readonly alertService: AlertService) {
    }

    async sendForm(data: any, title: string): Promise<void> {
        try {
            await axios.post("/send-form", {form: data, title});
            this.alertService.invokeModalAlert("Успех")
        } catch (error) {
            const errMessage = isAxiosError(error) ? error?.response?.data?.error || 'Ошибка!' : 'Ошибка!';
            this.alertService.invokeModalAlert(errMessage, {type: 'error'})
        }
    }

    async sendTest(data: any, title: string): Promise<void> {
        try {
            await axios.get("");
            this.alertService.invokeModalAlert("Успех")
        } catch (error) {
            this.alertService.invokeModalAlert(error as string, {type: 'error'})
        }
    }

    async sendFeedback(data: any): Promise<void> {
        try {
            const res: any = await axios.post("/send-feedback", {form: data});
            this.alertService.invokeModalAlert(res.data, {clearOnTimeout: false, rootSelector: '.feedback-form__wrap'})
        } catch (error: any) {
            const errMessage = isAxiosError(error) ? error?.response?.data?.error || 'Ошибка!' : 'Ошибка!';
            this.alertService.invokeModalAlert(errMessage, {clearOnTimeout: false, rootSelector: '.feedback-form__wrap', type: 'error'})
        }
    }
}
