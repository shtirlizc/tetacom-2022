// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { rehypeImageFigures } from "./src/plugins/rehype-image-figures.js";

// https://astro.build/config
export default defineConfig({
  site: "https://tetacom.pro/",
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeImageFigures, rehypeKatex],
  },
  redirects: {
    "/education": "/education/opz-course",
    "/products": "/products/rockstim",
  },
});
