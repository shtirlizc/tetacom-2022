import { gsap } from 'gsap';
import Swiper, { Pagination } from 'swiper';

export const MainSlider = {
  mainSwiper: null,
  slidesCount: document.querySelectorAll('.js-main-swiper .swiper-slide')
    .length,
  nextButton: document.getElementById('js-main-swiper-next'),
  slideWidth: 0,

  init() {
    if (this.slidesCount) {
      if (this.slidesCount === 1) {
        document.querySelector('._main-slider__title-arrow').style.display =
          'none';
      }

      this.mainSwiper = new Swiper('.js-main-swiper', {
        modules: [Pagination],
        loop: this.slidesCount > 1,
        slidesPerView: 'auto',
        spaceBetween: 0,
        speed: 300,
        slideToClickedSlide: true,
        pagination: {
          el: '._swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        breakpoints: {
          769: {
            centeredSlides: true,
            speed: 600,
            spaceBetween: 60,
            pagination: false,
          },
          1081: {
            centeredSlides: true,
            spaceBetween: 120,
            pagination: false,
            speed: 900,
          },
        },
        on: {
          init: () => {
            this.watch();
          },
          slidePrevTransitionStart: (swiper) => {
            this.changeTitle(Array.from(swiper.slides), false);
          },
          slideNextTransitionStart: (swiper) => {
            this.changeTitle(Array.from(swiper.slides), true);
          },
        },
      });
    }
  },

  watch() {
    if (this.nextButton) {
      this.nextButton.addEventListener('click', this.toNextSlide.bind(this));
    }
  },

  toNextSlide() {
    if (this.mainSwiper) {
      this.mainSwiper.slideNext();
    }
  },

  changeTitle(slides, isNextDirection) {
    const currentSlideTitle = slides.find((slide) =>
      slide.classList.contains('swiper-slide-active'),
    ).dataset.title;
    const nextButton = this.nextButton;
    const textWrapper = nextButton.querySelector('._main-slider__title-text');
    const prevTextElement = textWrapper.querySelector('span');

    if (prevTextElement.innerText !== currentSlideTitle) {
      const nextText = document.createElement('span');
      nextText.innerText = currentSlideTitle;
      nextText.style.opacity = '0';

      textWrapper.appendChild(nextText);

      const y = 40;
      gsap.fromTo(
        nextText,
        { opacity: 0, y: isNextDirection ? -1 * y : y },
        { opacity: 1, y: 0 },
      );
      gsap.to(prevTextElement, {
        opacity: 0,
        y: isNextDirection ? y : -1 * y,
        onComplete() {
          prevTextElement.remove();
        },
      });
    }
  },
};
