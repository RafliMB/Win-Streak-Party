import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://winstreakparty.my.id',
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
});
