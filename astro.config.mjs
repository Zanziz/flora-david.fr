// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Adresse définitive du site : sert au sitemap et aux aperçus de partage.
  site: 'https://flora-david.fr',
  // Adresses sans « / » final (flora-david.fr/e-commerce), servies sans redirection par Netlify.
  trailingSlash: 'never',
  build: { format: 'file' },
  // Conserve la ponctuation des textes de Flora à l’affichage.
  markdown: { processor: satteri({ features: { smartPunctuation: false } }) },
  // Les mentions légales n'ont pas à apparaître dans Google.
  integrations: [sitemap({ filter: (page) => !page.endsWith('/mentions-legales') })],
});
