import Accordion from 'accordion-js';

export const AccordionBlock = {
  init() {
    new Accordion(Array.from(document.querySelectorAll('._accordion')), {
      duration: 250,
      showMultiple: true,
    });
  },
};
