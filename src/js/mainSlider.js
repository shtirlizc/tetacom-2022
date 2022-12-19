import { gsap } from 'gsap';
import Swiper, { Pagination } from 'swiper';

export const MainSlider = {
  mainSwiper: null,
  slidesCount: document.querySelectorAll('.js-main-swiper .swiper-slide')
    .length,
  nextButton: document.getElementById('js-main-swiper-next'),
  slideWidth: 0,

  pointsWrapper: document.querySelector('._main-slider__track-points'),
  points: [],
  pointsStep: 0,
  pointRadius: 8,

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
          init: (swiper) => {
            this.createPoints(swiper);
            this.watch();
          },
          slidePrevTransitionStart: (swiper) => {
            this.changeTitle(Array.from(swiper.slides), false);
            this.movePoints(false);
          },
          slideNextTransitionStart: (swiper) => {
            this.changeTitle(Array.from(swiper.slides), true);
            this.movePoints(true);
          },
          resize: this.updatePoints.bind(this),
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

  createPoints(swiper) {
    const [first, second] = swiper.slidesGrid;
    this.pointsStep = second - first;

    swiper.slides.map((slide, index) => {
      if (!index) {
        this.slideWidth = parseInt(slide.offsetWidth);
      }

      const left =
        slide.getBoundingClientRect().left +
        window.scrollX +
        this.slideWidth / 2 -
        this.pointRadius;
      this.points.push(left);

      this.createPoint(left);
    });
  },

  createPoint(left, putToStart = false) {
    const point = document.createElement('span');
    point.style.left = `${left}px`;
    point.style.transform = 'scale(0)';

    if (putToStart) {
      this.pointsWrapper.prepend(point);
    } else {
      this.pointsWrapper.appendChild(point);
    }

    gsap.fromTo(point, { scale: 0 }, { scale: 1, delay: 0.5 });
  },

  updatePoints(swiper) {
    const [first, second] = swiper.slidesGrid;
    this.pointsStep = second - first;
    this.points.length = 0;
    const pointElements = this.pointsWrapper.querySelectorAll('span');

    swiper.slides.map((slide, index) => {
      if (!index) {
        this.slideWidth = parseInt(slide.offsetWidth);
      }

      const left =
        slide.getBoundingClientRect().left +
        window.scrollX +
        this.slideWidth / 2 -
        this.pointRadius;
      this.points.push(left);

      pointElements[index].style.left = `${left}px`;
    });
  },

  movePoints(isNextDirection) {
    const pointsStep = this.pointsStep;
    const offset = isNextDirection ? -1 * pointsStep : pointsStep;

    if (this.points.length) {
      const pointElements = this.pointsWrapper.querySelectorAll('span');

      pointElements.forEach((point) => {
        const currentLeft = parseInt(point.style.left);
        gsap.to(point, {
          left: currentLeft + offset,
          duration: 0.9,
          ease: 'back.out(0.8)',
        });
      });

      if (isNextDirection) {
        const [firstElement] = pointElements;
        firstElement.remove();
        const leftPosition = this.points[this.points.length - 1];
        this.createPoint(leftPosition);
      } else {
        const lastElement = pointElements[pointElements.length - 1];
        lastElement.remove();
        const [leftPosition] = this.points;
        this.createPoint(leftPosition, true);
      }
    }
  },
};
