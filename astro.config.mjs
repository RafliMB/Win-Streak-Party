import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://winstreakparty.my.id',
  output: 'static',
  adapter: vercel(),
  compressHTML: true,
  integrations: [sitemap()],
});
