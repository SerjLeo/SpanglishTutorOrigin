import {FormControlService, ViewService} from "./types";

export default class Modal {
    modal: HTMLElement | null = null

    constructor(private srcEl: HTMLElement, private view: ViewService, private formControl: FormControlService){
        this.init()
    }

    init() {
        const paper = document.createElement('div')
        const close = document.createElement('div')
        paper.classList.add('modal')
        close.classList.add('close')
        this.srcEl.appendChild(paper)
        this.srcEl.appendChild(close)
        this.modal = paper
        this.addListeners()
    }

    createForm(title: string) {
        if(!this.modal) return
        this.modal.innerHTML = ''
        this.view.renderForm(this.modal)
        const formElement = document.querySelector('#inquirer-form') as HTMLFormElement
        if(!formElement) return;
        this.formControl.listenToForm(formElement, title)
        this.srcEl.classList.add('modal-active')

        // Закрытие по клику за формой
        // this.srcEl.addEventListener('click', (e) => {
        //     console.log(e.target);
        //     if (e.target.className !== 'modal' && !this.modal.contains(e.target)) {
        //         this.srcEl.classList.remove('modal-active')
        //     }
        // })
    }

    createTest(title: string) {
        const answers = [0,0,0]
        let step = 0
        const render = () => {
            if(!this.modal) return;
            this.modal.innerHTML = ''
            this.view.renderTest(this.modal, step, answers[step])
            const testElement = document.querySelector('#test-form') as HTMLFormElement
            const backBtn = document.querySelector('.back') as HTMLButtonElement
            if(!testElement || !backBtn) return;
            this.formControl.listenToTest(
                testElement,
                title,
                nextStep,
                backBtn,
                prevStep,
                step,
                changeAnswer
            )
        }
        const nextStep = () => {
            if (step < 3) {
                step += 1
                render()
                fillProgressBar()
            }
            if(step>3) step = 3
        }
        const prevStep = () => {
            step -= 1
            render()
            fillProgressBar()
        }
        const fillProgressBar = () => {
            let width = Math.floor(step*100/3)
            document.querySelector('.progress-bar-fill')?.setAttribute('style',`width:${width}%`)
        }
        const changeAnswer = (answer: number, id: number) => {
            answers[answer] = id
        }
        render()
        this.srcEl.classList.add('modal-active')
    }

    closeModal() {
        this.srcEl.classList.remove('modal-active')
        if(!this.modal) return;
        this.modal.innerHTML = ''
    }

    closeSignUp() {
        const signUpEl = document.querySelector('.fast-sign-up') as HTMLElement;
        if(!signUpEl) return;
        signUpEl.style.display = 'none';
    }

    addListeners() {
        document.querySelector('.open-form-single')?.addEventListener('click', () => this.createForm('Запись на индивидуальное занятие'))
        document.querySelector('.open-form-group')?.addEventListener('click', () => this.createForm('Запись на групповое занятие'))
        document.querySelector('.open-form-free')?.addEventListener('click', () => this.createTest('Запись на бесплатное занятие'))
        document.querySelector('.close')?.addEventListener('click', () => this.closeModal())
        document.querySelector('.sign-up-btn')?.addEventListener('click', () => this.createForm('Запись на индивидуальное занятие'))
        document.querySelector('.sign-up-close')?.addEventListener('click', () => this.closeSignUp())
    }
}
