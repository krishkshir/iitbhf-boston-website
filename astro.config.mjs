// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://iitbhf-boston.cloudflare-atop596.workers.dev',
  output: 'static',
  trailingSlash: 'never',
  vite: { plugins: [tailwindcss()] },
});
