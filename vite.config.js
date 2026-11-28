import { defineConfig } from 'vite';

// JSX runtime otomatis, jadi file komponen gak wajib `import React`.
export default defineConfig({
  esbuild: { jsx: 'automatic' },
});
