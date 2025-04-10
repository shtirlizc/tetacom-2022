import Swiper from 'swiper';

export const Slider = {
  init() {
    this.oneSliders();
  },

  oneSliders() {
    const oneSliderList = document.querySelectorAll('._slider-one-slide');
    oneSliderList.forEach((slider) => {
      const swiper = slider.querySelector('.swiper');

      if (swiper) {
        const swiperOne = new Swiper(swiper, {
          speed: 300,
          spaceBetween: 40,
          autoHeight: true,
          loop: true,
        });

        const prevButton = slider.querySelector('.js-prev-slide');
        const nextButton = slider.querySelector('.js-next-slide');

        if (prevButton) {
          prevButton.addEventListener('click', () => {
            swiperOne.slidePrev();
          });
        }
        if (nextButton) {
          nextButton.addEventListener('click', () => {
            swiperOne.slideNext();
          });
        }
      }
    });
  },
};
