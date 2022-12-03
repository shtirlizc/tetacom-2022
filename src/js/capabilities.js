import { gsap } from 'gsap';

export const Capabilities = {
  offsetTop: 120,
  difference: 200,
  track: document.querySelector('.js-sticky-track'),
  cards: [],
  cardsHeightMap: [],
  currentCardNumber: null,

  init() {
    if (this.track) {
      this.track.style.marginBottom = '50vh';

      this.cards = Array.from(this.track.children);
      const trackHeight = this.cards.reduce((sum, element) => {
        return sum + element.offsetHeight;
      }, 0);
      this.track.style.height = `${trackHeight}px`;

      this.cards.forEach((card, index) => {
        const lastItem = this.cardsHeightMap[this.cardsHeightMap.length - 1];
        this.cardsHeightMap.push({
          index,
          height: lastItem
            ? card.offsetHeight + lastItem.height
            : card.offsetHeight,
        });
      });

      this.toUnFixedCards();

      document.addEventListener('scroll', () => {
        const trackY = this.track.getBoundingClientRect().y;

        if (trackY <= this.offsetTop && trackY + trackHeight > this.offsetTop) {
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
      });
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
    this.cards.forEach((card) => {
      const clientRect = card.getBoundingClientRect();
      card.style.position = 'fixed';
      card.style.left = `${clientRect.x}px`;
      card.style.top = `${clientRect.y}px`;
    });
  },

  toUnFixedCards() {
    this.cards.forEach((card, index) => {
      const top = index * this.difference;
      const left = index % 2 ? 300 : 0;

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
