export default function initCursor() {
    const cursorElem = document.querySelector('.intro-cursor') as HTMLElement;
    if (!cursorElem) return;
    document.addEventListener('mousemove', (event) => {
        cursorElem.style.top = `${event.y}px`;
        cursorElem.style.left = `${event.x}px`;
        cursorElem.style.transform = 'translate(-50%, -50%)';
    })
}
