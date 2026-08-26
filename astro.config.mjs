// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Deployed to GitHub Pages at https://larry-otieno.github.io/My-Porfolio/
// If you move to a custom domain, set `site` to it and delete `base`.
export default defineConfig({
  site: 'https://larry-otieno.github.io',
  base: '/My-Porfolio',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    // Dual themes emitted as --shiki-light / --shiki-dark CSS variables, so
    // code colours track the site theme instead of Shiki hard-coding a dark
    // background that fails contrast under the light theme.
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
