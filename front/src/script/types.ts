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
  validateTest(): void
}

export type AnswerHandler = {
  (answer: number, id: number): void
}

export type EmptyHandler = {
  (): void
}

export type QuestionVariant = {
  id: number
  text: string
  img: string
}

export interface FormControlService {
  listenToForm(form: HTMLFormElement, title: string): void
  listenToTest(form: HTMLFormElement, title: string, submitHandler: EmptyHandler, backBtn: HTMLButtonElement, backHandler: EmptyHandler, step: number, answerHandler: AnswerHandler): void
}

export interface ViewService {
  renderForm(renderContainer: HTMLElement): void
  renderTest(renderContainer: HTMLElement, step: number, checkedID: number): void
}
