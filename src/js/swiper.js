import Swiper, { Autoplay, EffectFade } from 'swiper';

export const Slider = {
  init() {
    new Swiper('.js-who-are-we-swiper', {
      modules: [Autoplay, EffectFade],
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 4000,
      },
      effect: 'fade',
    });
  },
};
