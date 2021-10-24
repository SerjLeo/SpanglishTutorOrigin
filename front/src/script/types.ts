export interface ApiService {
  sendEmail(data: any): Promise<void>
  sendTest(data: any, title: string): Promise<void>
}

export type AlertTypes = 'success' | 'error'

export interface AlertService {
  validationAlert(msg: string): void
  invokeAlert(msg: string, type?: AlertTypes): void
}

export interface ValidatorService {
  validateForm(form: HTMLFormElement): boolean
}

export interface FormControlService {
  listenToForm(form: HTMLFormElement, title: string): void
}
