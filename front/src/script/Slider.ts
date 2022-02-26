import Splide from '@splidejs/splide';
import {ApiService} from "./types";
import {languageVocabulary} from "./entities/helpers";

async function populateSlides(api: ApiService) {
  const rootSliderEl = document.querySelector('.slider-target') as HTMLElement;
  const sliderEl = document.querySelector('.feedback__slider') as HTMLElement;
  if(!rootSliderEl || !sliderEl) return;
  // const feedbacks = await api.getFeedback();
  const feedbacks = [{id: 1, name: 'lol', lang: 'eng', text: 'lorem kek'}, {id: 2, name: 'lol2', lang: 'eng', text: 'lorem kek'}, {id: 3, name: 'lol', lang: 'esp', text: 'lorem kek dsf sdaf sdf adsfasdf sd'}]
  if(feedbacks.length) sliderEl.style.display = 'block';
  feedbacks.forEach((feedback, index) => {
    const slide = document.createElement('div');
    slide.classList.add('splide__slide', 'slide');

    slide.innerHTML = `
      <div class="slide__wrap">
        <div class="slide__content">
            <div class="slide__content-top">
              <div class="slide__content-quotes"></div>
              <div class="slide__content-text">${feedback.text}</div>
            </div>
            <div class="slide__content-bottom">
                <div class="slide__content-avatar cat-${index%4+1}"></div>
                <div class="slide__content-info">
                  <div class="slide__content-name">${feedback.name}</div>
                  <div class="slide__content-lang">${languageVocabulary(feedback.lang)}</div>
                </div>
            </div>
        </div>
    </div>
    `

    rootSliderEl.appendChild(slide)
  });
}

export default async function(api: ApiService) {
  await populateSlides(api);
  const sliderEl = document.querySelector('.feedback__slider') as HTMLElement;
  if(!sliderEl) return;
  new Splide(sliderEl , {
    type: 'loop',
    pagination: false,
    perPage: 3,
    gap: 20,
    breakpoints: {
      1300: {
        perPage: 2,
      },
      900: {
        perPage: 1,
      },
      768: {
        arrows: false
      },
      640: {
        perPage: 1,
      }
    }
  }).mount();
}
