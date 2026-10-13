/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import writings from './src/data/writings.json' with { type: 'json' };

const SITE_TITLE = 'Słowa';

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// GitHub Pages has no URL rewrites: write an index.html for every writing so direct links
// and page refreshes return 200, and a 404.html fallback for anything else.
function writingPages(): Plugin {
  let outDir = '';
  return {
    name: 'writing-pages',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const html = fs.readFileSync(path.join(outDir, 'index.html'), 'utf-8');
      for (const { slug, title } of writings) {
        const pageTitle = `${escapeHtml(title)} – ${SITE_TITLE}`;
        const page = html
          .replace(/<title>.*<\/title>/, `<title>${pageTitle}</title>`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${pageTitle}`);
        fs.mkdirSync(path.join(outDir, slug), { recursive: true });
        fs.writeFileSync(path.join(outDir, slug, 'index.html'), page);
      }
      fs.copyFileSync(path.join(outDir, 'index.html'), path.join(outDir, '404.html'));
    },
  };
}

export default defineConfig({
  base: '/words/',
  plugins: [react(), writingPages()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
