import Swiper, { Autoplay, EffectFade } from "swiper";

export const Slider = {
  buttons: document.querySelector(".js-competencies-swiper"),

  init() {
    new Swiper(".js-competencies-swiper", {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
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
