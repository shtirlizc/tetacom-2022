import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CELL_WIDTH = 612;
const TITLE_WIDTH = 4 * CELL_WIDTH;
const LAST_CELL_WIDTH = CELL_WIDTH;

export const History = {
  panelsContainer: document.querySelector('#panels-container'),

  init() {
    if (this.panelsContainer) {
      const containerWidth =
        parseInt(this.panelsContainer.dataset.slidesCount) * CELL_WIDTH +
        TITLE_WIDTH +
        LAST_CELL_WIDTH;

      this.panelsContainer.style.width = `${containerWidth}px`;

      this.horizontalScroll();
      this.setDatesHeight();
    }
  },

  horizontalScroll() {
    let tween;

    /* Main navigation */
    document.querySelectorAll('.anchor').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        let targetElem = document.querySelector(e.target.getAttribute('href')),
          y = targetElem;
        if (
          targetElem &&
          this.panelsContainer.isSameNode(targetElem.parentElement)
        ) {
          let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
            totalMovement = (panels.length - 1) * targetElem.offsetWidth;
          y = Math.round(
            tween.scrollTrigger.start +
              (targetElem.offsetLeft / totalMovement) * totalScroll,
          );
        }
        gsap.to(window, {
          scrollTo: {
            y: y,
            autoKill: false,
          },
          duration: 1,
        });
      });
    });

    /* Panels */
    const panels = gsap.utils.toArray('#panels-container ._history__panel');
    tween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: '#panels-container',
        pin: true,
        start: 'top top',
        scrub: 1,
        end: () => '+=' + (this.panelsContainer.offsetWidth - innerWidth),
      },
    });

    const trigger = window.innerWidth / 2;
    document.addEventListener('scroll', () => {
      document
        .querySelectorAll('._history-timeline__progressbar')
        .forEach((progress) => {
          const startPoint = progress.querySelector(
            '._history-timeline__progressbar-start',
          );
          const endPoint = progress.querySelector(
            '._history-timeline__progressbar-end',
          );

          if (progress.getBoundingClientRect().left < trigger) {
            gsap.to(startPoint, {
              backgroundColor: 'var(--primary-color)',
            });
          } else {
            gsap.to(startPoint, {
              backgroundColor: 'var(--hard-grey)',
            });
          }

          if (progress.getBoundingClientRect().left > trigger) {
            if (endPoint) {
              gsap.to(endPoint, {
                width: 0,
                duration: 0.15,
              });
            }
          }

          if (
            progress.getBoundingClientRect().right >= trigger &&
            progress.getBoundingClientRect().left < trigger
          ) {
            if (endPoint) {
              gsap.to(endPoint, {
                width: trigger - progress.getBoundingClientRect().left,
                background: null,
                duration: 0.15,
              });
            }
          }

          if (progress.getBoundingClientRect().right < trigger) {
            if (endPoint) {
              gsap.to(endPoint, {
                width: '100%',
                background: 'var(--primary-color)',
                duration: 0.15,
              });
            }
          }
        });
    });
  },

  setDatesHeight() {
    let maxHeight = 0;
    const dates = document.querySelectorAll('._history-timeline__date');

    dates.forEach((item) => {
      const height = parseInt(item.offsetHeight);
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    dates.forEach((item) => {
      if (parseInt(item.offsetHeight) < maxHeight) {
        item.style.height = `${maxHeight}px`;
      }
    });
  },
};
