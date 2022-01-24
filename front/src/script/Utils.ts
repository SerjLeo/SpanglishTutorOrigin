export function handleLinks() {
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
