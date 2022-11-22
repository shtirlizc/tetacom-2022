import { debounce } from "lodash";

export const PageYOffset = {
  showHeaderOffset: 50, // min value is 1
  value: window.scrollY,
  header: document.querySelector("._header"),

  init() {
    if (this.header) {
      if (this.value > this.showHeaderOffset) {
        this.add();
      }

      document.addEventListener(
        "scroll",
        debounce(this.calcScroll.bind(this), 50)
      );
    }
  },

  calcScroll() {
    const { scrollY } = window;

    if (scrollY > this.showHeaderOffset) {
      this.add();
    } else {
      this.remove();
    }

    if (scrollY > this.value) {
      this.header.classList.add("hidden");
    } else {
      this.header.classList.remove("hidden");
    }

    this.value = scrollY;
  },

  add() {
    this.header.classList.add("active");
  },

  remove() {
    this.header.classList.remove("active");
  },
};
