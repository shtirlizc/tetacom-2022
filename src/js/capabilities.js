import { gsap } from 'gsap';
import { debounce } from 'lodash';

export const Capabilities = {
  leftPoints: [0, 356, 110, 0, 300],
  offsetTop: 120,
  difference: 200,
  track: document.querySelector('.js-sticky-track'),
  cards: [],
  cardsHeightMap: [],
  currentCardNumber: null,

  init() {
    if (this.track) {
      this.setMode();

      window.addEventListener('resize', debounce(this.setMode.bind(this), 50));
    }
  },

  setMode() {
    this.calcCardsHeight();

    if (window.innerWidth > 1080) {
      this.setup();
    } else {
      this.destroySticky();
    }
  },

  destroySticky() {
    this.track.style.marginBottom = '0';
    this.track.style.height = `auto`;
    document.removeEventListener(
      'scroll',
      this.listenTrackScrolling.bind(this),
    );

    this.cards.forEach((card) => {
      card.removeAttribute('style');
      gsap.to(card, {
        transform: `translate(0)`,
      });
    });
  },

  calcCardsHeight() {
    this.cardsHeightMap.length = 0;

    this.cards.forEach((card, index) => {
      const lastItem = this.cardsHeightMap[this.cardsHeightMap.length - 1];
      this.cardsHeightMap.push({
        index,
        height: lastItem
          ? card.offsetHeight + lastItem.height
          : card.offsetHeight,
      });
    });
  },

  setup() {
    this.track.style.marginBottom = '50vh';

    this.cards = Array.from(this.track.children);
    const trackHeight = this.cards.reduce((sum, element) => {
      return sum + element.offsetHeight;
    }, 0);
    this.track.style.height = `${trackHeight}px`;

    this.calcCardsHeight();

    const trackY = this.track.getBoundingClientRect().y;
    const divider =
      this.cardsHeightMap[this.cardsHeightMap.length - 1].height +
      trackY -
      this.offsetTop;

    this.toUnFixedCards();

    if (trackY < 0) {
      this.currentCardNumber = this.cards.length - 1;
      this.toFixedCards();
      this.shiftCards(Math.abs(divider - this.difference));
    }

    document.addEventListener('scroll', this.listenTrackScrolling.bind(this));
  },

  listenTrackScrolling() {
    const trackY = this.track.getBoundingClientRect().y;

    if (
      trackY <= this.offsetTop &&
      trackY + parseInt(this.track.style.height) > this.offsetTop
    ) {
      if (this.currentCardNumber === null) {
        this.toFixedCards();
      }

      this.currentCardNumber = this.cardsHeightMap.find(
        (card) => card.height > Math.abs(trackY - this.offsetTop),
      ).index;
    } else {
      if (trackY > 0) {
        if (this.currentCardNumber !== null) {
          this.toUnFixedCards();
        }

        this.currentCardNumber = null;
      }
    }

    if (this.currentCardNumber !== null) {
      this.scrollTracking();
    }
  },

  scrollTracking() {
    const trackY = this.track.getBoundingClientRect().y;
    const divider =
      this.cardsHeightMap[this.currentCardNumber].height +
      trackY -
      this.offsetTop;

    divider <= this.difference
      ? this.shiftCards(Math.abs(divider - this.difference))
      : this.clearShifts();
  },

  toFixedCards() {
    this.cards.forEach((card, index) => {
      const top = index * this.difference + this.offsetTop;

      const clientRect = card.getBoundingClientRect();
      card.style.position = 'fixed';
      card.style.left = `${clientRect.x}px`;
      card.style.top = `${top}px`;
    });
  },

  toUnFixedCards() {
    this.cards.forEach((card, index) => {
      const top = index * this.difference;
      const left = this.leftPoints[index % 5];

      card.style.position = 'absolute';
      card.style.top = `${top}px`;
      card.style.left = `${left}px`;
      card.style.zIndex = this.cards.length - index;
    });
  },

  shiftCards(shiftBase) {
    const shiftValue = shiftBase + this.currentCardNumber * this.difference;

    this.cards.forEach((card, index) => {
      let transformValue;
      if (index - this.currentCardNumber < 0) {
        transformValue = -1000 * this.cards.length;
      } else if (index - this.currentCardNumber === 0) {
        transformValue = -5 * shiftBase - shiftValue;
      } else {
        transformValue = -1 * shiftValue;
      }

      gsap.to(card, {
        transform: `translateY(${transformValue}px)`,
      });
    });
  },

  clearShifts() {
    const shiftValue = this.currentCardNumber * this.difference;

    this.cards.forEach((card, index) => {
      if (index >= this.currentCardNumber) {
        gsap.to(card, {
          transform: `translateY(${-1 * shiftValue}px)`,
        });
      }
    });
  },
};
