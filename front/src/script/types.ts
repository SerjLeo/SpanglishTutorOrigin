export interface ApiService {
  sendForm(data: any, title: string): Promise<void>
  sendFeedback(data: any): Promise<void>
  sendTest(data: any, title: string): Promise<void>
}

export type AlertTypes = 'success' | 'error'

export type AlertConfig = {
  type?: AlertTypes
  rootSelector?: string
  clearOnTimeout?: boolean
}

export interface AlertService {
  validationAlert(msg: string, errorTarget: string): void
  invokeModalAlert(message: string, cfg?: AlertConfig): void
}

export interface ValidatorService {
  validateForm(form: HTMLFormElement, errorTarget: string): boolean
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
