/* eslint-disable no-unused-vars */
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_TETACOM_CONTACT_ENDPOINT?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

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
