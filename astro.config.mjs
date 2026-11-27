import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://winstreakparty.my.id',
  output: 'static',
  adapter: node({
    mode: 'standalone',
  }),
  compressHTML: true,
  integrations: [sitemap()],
});
