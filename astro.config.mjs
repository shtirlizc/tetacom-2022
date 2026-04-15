// @ts-check
import { defineConfig } from "astro/config";
import { rehypeImageFigures } from "./src/plugins/rehype-image-figures.js";

// https://astro.build/config
export default defineConfig({
  site: "https://shtirlizc.github.io",
  markdown: {
    rehypePlugins: [rehypeImageFigures],
  },
  redirects: {
    "/education": "/education/opz-course",
  },
});
