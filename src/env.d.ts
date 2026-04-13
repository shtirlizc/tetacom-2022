/* eslint-disable no-unused-vars */
/// <reference types="astro/client" />

declare module "accordion-js" {
  interface AccordionOptions {
    duration?: number;
    showMultiple?: boolean;
  }

  interface AccordionConstructor {
    new (
      selectorOrElement: string | HTMLElement | Array<string | HTMLElement>,
      options?: AccordionOptions,
    ): unknown;
  }

  const Accordion: AccordionConstructor;
  export default Accordion;
}
