const onHeaderHover = () => {
    const header = document.querySelector('.header')

    console.log(header)

    header?.addEventListener('mouseover', e => {
        header.classList.toggle('header__transparent', !!(e.target as HTMLElement).closest('.header__nav-link'))
    })

    header?.addEventListener('mouseleave', e => {
        header.classList.remove('header__transparent')
    })
}

const handleLinks = () => {
    document.querySelectorAll<HTMLAnchorElement>('.header__nav-link').forEach(navLink => {
        navLink.addEventListener('click',  function(event) {
            event.preventDefault()
            const targetClass = this.hash.substr(1)
            if(!targetClass) return;
            const scrollTarget = document.querySelector(`.${targetClass}`)
            if(!scrollTarget) return;
            scrollTarget.scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}

const handleMobileMenuBtn = () => {
    document.querySelector('.menu-mobile__btn')?.addEventListener('click', () => {
        document.querySelector('.nav-mobile')?.classList.toggle('active')
    })
}

export default function initHandlers() {
    onHeaderHover()
    handleLinks()
    handleMobileMenuBtn()
}