import {AlertService, ApiService} from "./types";
import axios from "axios";

export default class Api implements ApiService {
  constructor(private readonly api_url: string, private readonly alertService: AlertService) {
  }

  async sendForm(data: any, title: string): Promise<void> {
    try {
      await axios.post("/send-form", { form: data , title });
      this.alertService.invokeAlert("Успех", 'success')
    } catch (error) {
      this.alertService.invokeAlert(error as string, 'error')
    }
  }

  async sendTest(data: any, title: string): Promise<void> {
    try {
      await axios.get("");
      this.alertService.invokeAlert("Успех", 'success')
    } catch (error) {
      this.alertService.invokeAlert(error as string, 'error')
    }
  }
}
