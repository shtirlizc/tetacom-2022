import { debounce } from 'lodash';
import { Dropdown } from './dropdown';

export const PageYOffset = {
  showHeaderOffset: 50, // min value is 1
  value: window.scrollY,
  header: document.querySelector('._header'),

  init() {
    if (this.header) {
      if (this.value > this.showHeaderOffset) {
        this.add();
      } else {
        this.header.classList.remove('hidden');
      }

      document.addEventListener(
        'scroll',
        debounce(this.calcScroll.bind(this), 50),
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

    const scrollYValue = this.value > 0 ? this.value : 0;
    if (scrollY > scrollYValue) {
      this.header.classList.add('hidden');
      this.header.querySelectorAll('._dropdown').forEach((dropdown) => {
        Dropdown.close(dropdown);
      });
    } else {
      this.header.classList.remove('hidden');
    }

    this.value = scrollY;
  },

  add() {
    this.header.classList.add('active');
  },

  remove() {
    this.header.classList.remove('active');
  },
};
