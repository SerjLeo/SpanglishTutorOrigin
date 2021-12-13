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
        // this.animateWelcome();
        // window.onbeforeunload = function () {
        //     document.querySelector('body')!.style.visibility = 'hidden';
        //     window.scrollTo(0, 0);
        // }
        this.animateLine();
    }

    animateWelcome() {
        const mainTimeline = gsap.timeline({
            repeat: 0
        })
        mainTimeline
            .set(['.welcome'],{autoAlpha: 1})
            .to('.header', {autoAlpha: 1, duration: 3, ease: 'power3'})
            .add('headerIn')
            .fromTo('.welcome__text', {autoAlpha: 0, yPercent: "20"}, {autoAlpha: 1, duration: 1.2, yPercent: "0", ease: 'power3'}, 'headerIn-=1.2')
            .fromTo('.welcome__hands', {autoAlpha: 0, yPercent: "60"}, {autoAlpha: 1, duration: 1.6, yPercent: "0", ease: 'power1'}, 'headerIn')
            .add('textIn')
            .to('html', {overflowY: 'auto'}, 'textIn+=1')
    }

    animateLine() {

    }
}
