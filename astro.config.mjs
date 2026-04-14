// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://shtirlizc.github.io',
    base: '/tetacom-2022',
    redirects: {
        "/education": "/education/opz-course",
    }
});


