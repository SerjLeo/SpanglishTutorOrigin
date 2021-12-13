import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(CSSRulePlugin, ScrollTrigger, MotionPathPlugin);

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

    calcSVGPath(): string {
        const pathData: string[] = []
        const SVGContainer = document.querySelector('.svg-line') as SVGElement;
        pathData.push(`M ${SVGContainer.getBoundingClientRect().width/2} 100`)
        const textContainers = document.querySelectorAll<HTMLElement>('.advantages__section__text')
        //First line
        const firstContainer = textContainers[0].getBoundingClientRect()
        const containerOffset = firstContainer.top - SVGContainer.getBoundingClientRect().top - 100;
        const xPoint = firstContainer.width/2 - SVGContainer.getBoundingClientRect().left + firstContainer.left - SVGContainer.getBoundingClientRect().width/2
        pathData.push(`q 0 ${containerOffset/2.5}, ${xPoint/2} ${containerOffset/2} t ${xPoint/2} ${containerOffset/2}`)
        //Second line
        const secondContainer = textContainers[1].getBoundingClientRect()
        pathData.push(`v ${firstContainer.height}`)
        const y2offset = secondContainer.top - firstContainer.top - firstContainer.height
        pathData.push(`q 0 ${y2offset/2.5}, ${-xPoint} ${y2offset/2} t ${-xPoint} ${y2offset/2}`)
        //Third line
        const thirdContainer = textContainers[2].getBoundingClientRect()
        pathData.push(`v ${secondContainer.height}`)
        const y3offset = thirdContainer.top - secondContainer.top - secondContainer.height
        pathData.push(`q 0 ${y3offset/2.5}, ${xPoint} ${y3offset/2} t ${xPoint} ${y3offset/2}`)
        pathData.push(`v ${thirdContainer.height/2}`)

        return pathData.join(' ')
    }

    animateLine() {
        const path = this.calcSVGPath()
        const pathLine = document.querySelector('.svg-line__path') as SVGPathElement;
        pathLine.setAttribute('d', path);
        const timeline = gsap.timeline()
        const timelineDurationRatio = 15;
        timeline.to('#plane-path', {
            duration: timelineDurationRatio,
            motionPath: {
                path: '.svg-line__path',
                autoRotate: 50,
                align: '.svg-line__path',
                alignOrigin: [0.5, 0.5]
            }
        })
    }
}
