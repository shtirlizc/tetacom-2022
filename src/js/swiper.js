import Swiper, { Autoplay, EffectFade, Pagination } from "swiper";

export const Slider = {
  buttons: document.querySelector(".js-competencies-swiper"),

  init() {
    new Swiper(".js-competencies-swiper", {
      modules: [Pagination],
      loop: true,
      slidesPerView: 1.1,
      spaceBetween: 20,
      pagination: {
        el: "._swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        1081: {
          slidesPerView: 3,
          spaceBetween: 30,
          centeredSlides: true,
        },
      },
    });

    new Swiper(".js-who-are-we-swiper", {
      modules: [Autoplay, EffectFade],
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 4000,
      },
      effect: "fade",
    });

    new Swiper(".js-partners-swiper", {
      loop: true,
      slidesPerView: "auto",
      spaceBetween: 60,
    });
  },
};
