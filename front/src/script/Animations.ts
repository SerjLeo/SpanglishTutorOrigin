import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CSSRulePlugin, ScrollTrigger);

export class Animations {
    constructor() {
        window.addEventListener('load', () => {
            this.init();
        })
    }

    init() {
        this.animateIntro();
    }

    animateIntro() {
        const mainTimeline = gsap.timeline({
            repeat: 0
        })
        mainTimeline
            .to('.block-1', {autoAlpha: 1, duration: 2, ease: 'power3'})
            .add('backgroundIn')
            .fromTo('.block-1__animate', {autoAlpha: 0, yPercent: "60"}, {autoAlpha: 1, duration: 0.8, stagger: 0.3, yPercent: "0", ease: 'power3'}, 'backgroundIn-=1')
            .add('titleIn')
            .fromTo('.contacts__wrap',{autoAlpha: 0, xPercent: "30"},  {autoAlpha: 1, duration: 2, xPercent: "0", ease: 'power3'},'titleIn+=0.5')
            .fromTo('.fast-sign-up',{autoAlpha: 0, xPercent: "30"},  {autoAlpha: 1, duration: 2, xPercent: "0", ease: 'power3'},'titleIn')
    }
}
