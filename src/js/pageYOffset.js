export const PageYOffset = {
  showHeaderOffset: 50, // min value is 1
  value: window.scrollY,
  header: document.querySelector("._header"),

  init() {
    if (this.header) {
      if (this.value > this.showHeaderOffset) {
        this.add();
      }

      document.addEventListener("scroll", () => {
        if (window.scrollY > this.showHeaderOffset) {
          this.add();
        } else {
          this.remove();
        }
      });
    }
  },

  add() {
    this.header.classList.add("active");
  },

  remove() {
    this.header.classList.remove("active");
  },
};
