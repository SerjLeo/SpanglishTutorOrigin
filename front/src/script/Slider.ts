import Splide from '@splidejs/splide';

export default function() {
  new Splide( '.response_slider', {
    type   : 'loop'
  }).mount();
}
