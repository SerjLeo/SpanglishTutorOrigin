export type availableLanguage = 'eng' | 'esp'| 'both'
export type Feedback = {
  id: number,
  name: string,
  lang: availableLanguage,
  text: string
}

export interface ApiService {
  sendForm(data: any, title: string): Promise<void>
  sendFeedback(data: any): Promise<void>
  sendTest(data: any, title: string): Promise<void>
  getFeedback(): Promise<Feedback[]>
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
}

export interface ViewService {
  renderForm(renderContainer: HTMLElement): void
}
