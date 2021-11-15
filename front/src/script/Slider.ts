import Splide from '@splidejs/splide';
import {ApiService} from "./types";
import {languageVocabulary} from "./entities/helpers";

async function populateSlides(api: ApiService) {
  const feedbacks = await api.getFeedback();
  const rootSliderEl = document.querySelector('.slider-target')
  if(!rootSliderEl) return;
  feedbacks.forEach(feedback => {
    const slide = document.createElement('div');
    slide.classList.add('splide__slide', 'slide');

    slide.innerHTML = `
      <div class="slide__wrap">
        <div class="slide__content">
            <div class="slide__content-name">${feedback.name}</div>
            <div class="slide__content-lang">${languageVocabulary(feedback.lang)}</div>
            <div class="slide__content-text">${feedback.text}</div>
        </div>
    </div>
    `

    rootSliderEl.appendChild(slide)
  });
}

export default async function(api: ApiService) {
  await populateSlides(api);
  const sliderEl = document.querySelector('.responsive_slider') as HTMLElement;
  if(!sliderEl) return;
  new Splide(sliderEl , {
    type   : 'loop',
    perPage: 3,
    breakpoints: {
      1300: {
        perPage: 2,
      },
      900: {
        perPage: 1,
      },
      640: {
        perPage: 1,
        pagination: false,
      }
    }
  }).mount();
}
