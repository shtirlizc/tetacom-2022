import { gsap } from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const History = {
  init() {
    const panelsContainer = document.querySelector("#panels-container");
    let tween;

    /* Main navigation */
    document.querySelectorAll(".anchor").forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        let targetElem = document.querySelector(e.target.getAttribute("href")),
          y = targetElem;
        if (
          targetElem &&
          panelsContainer.isSameNode(targetElem.parentElement)
        ) {
          let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
            totalMovement = (panels.length - 1) * targetElem.offsetWidth;
          y = Math.round(
            tween.scrollTrigger.start +
              (targetElem.offsetLeft / totalMovement) * totalScroll
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
    const panels = gsap.utils.toArray("#panels-container ._history__panel");
    tween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#panels-container",
        pin: true,
        start: "top top",
        scrub: 1,
        end: () => "+=" + (panelsContainer.offsetWidth - innerWidth),
      },
    });
  },
};
