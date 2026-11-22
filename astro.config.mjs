// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Adresse définitive du site : sert au sitemap et aux aperçus de partage.
  site: 'https://flora-david.fr',
  // Adresses sans « / » final (flora-david.fr/e-commerce), servies sans redirection par Netlify.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
