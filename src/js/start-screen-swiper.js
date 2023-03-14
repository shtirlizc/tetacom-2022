import Swiper, { FreeMode } from 'swiper';

export const StartScreenSwiper = {
  init() {
    document
      .querySelectorAll('.js-start-screen-swiper .swiper-slide')
      .forEach((slide) => {
        const [tagEl] = slide.children;
        slide.style.width = `${tagEl.offsetWidth + 4}px`;
      });

    new Swiper('.js-start-screen-swiper', {
      modules: [FreeMode],
      spaceBetween: 26,
      freeMode: true,
      slidesPerView: 'auto',
    });
  },
};
