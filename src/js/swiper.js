import Swiper, { Autoplay, EffectFade } from "swiper";

export const Slider = {
  buttons: document.querySelector(".js-competencies-swiper"),

  init() {
    new Swiper(".js-competencies-swiper", {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
    });

    new Swiper(".js-who-are-we-swiper", {
      modules: [Autoplay, EffectFade],
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
      },
      effect: "fade",
    });
  },
};
