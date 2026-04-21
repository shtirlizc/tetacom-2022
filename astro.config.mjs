// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { rehypeImageFigures } from "./src/plugins/rehype-image-figures.js";

// https://astro.build/config
export default defineConfig({
  site: "https://tetacom.pro/",
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeImageFigures],
  },
  redirects: {
    "/education": "/education/opz-course",
    "/products": "/products/rockstim",
  },
});
