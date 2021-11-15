import Splide from '@splidejs/splide';

export default function() {
  new Splide( '.responsive_slider', {
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
