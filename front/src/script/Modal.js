import FormControl from './FormControl'
import View from './View'

export default class Modal {
    constructor(el){
        this.srcEl = el;
        this.view = new View()
        this.formControl = new FormControl()
        this.init()
    }

    init(){
        let paper = document.createElement('div')
        let close = document.createElement('div')
        paper.classList.add('modal')
        close.classList.add('close')
        this.srcEl.appendChild(paper)
        this.srcEl.appendChild(close)
        this.modal = paper
        this.addListeners()
    }

    createForm(title) {
        this.modal.innerHTML = ''
        this.view.renderForm(this.modal)
        this.formControl.listenToForm(document.querySelector('#inquirer-form'), title)
        this.srcEl.classList.add('modal-active')

        // Закрытие по клику за формой
        // this.srcEl.addEventListener('click', (e) => {
        //     console.log(e.target);
        //     if (e.target.className !== 'modal' && !this.modal.contains(e.target)) {
        //         this.srcEl.classList.remove('modal-active')
        //     }
        // })
    }

    createTest(title) {
        const answers = [0,0,0]
        let step = 0
        const render = () => {
            this.modal.innerHTML = ''
            this.view.renderTest(this.modal, step, answers[step])
            this.formControl.listenToTest(
                document.querySelector('#test-form'),
                title,
                nextStep,
                document.querySelector('.back'),
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
            document.querySelector('.progress-bar-fill').setAttribute('style',`width:${width}%`)
        }
        const changeAnswer = (anws, id) => {
            answers[anws] = id
        }
        render()
        this.srcEl.classList.add('modal-active')
    }

    closeModal() {
        this.srcEl.classList.remove('modal-active')
        this.modal.innerHTML = ''
    }

    addListeners() {
        document.querySelector('.open-form-single').addEventListener('click', () => this.createForm('Запись на индивидуальное занятие'))
        document.querySelector('.open-form-group').addEventListener('click', () => this.createForm('Запись на групповое занятие'))
        document.querySelector('.open-form-free').addEventListener('click', () => this.createTest('Запись на бесплатное занятие'))
        document.querySelector('.close').addEventListener('click', () => this.closeModal())
    }
}
