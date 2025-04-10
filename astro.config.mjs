import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  experimental: {
    svg: true,
  },
  output: "server",
  adapter: netlify(),
  site: "https://tetacom.pro",
  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
