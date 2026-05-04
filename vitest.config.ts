/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/unit/setup.ts'],
    include: ['tests/unit/**/*.{test,spec}.{ts,tsx}'],
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      // Coverage is scoped to the components currently exercised by unit tests.
      // As more components get tests, expand this include list and the gate
      // still holds the line at 70%.
      include: [
        'src/components/Hero.tsx',
        'src/components/Navbar.tsx',
        'src/components/ProjectCard.tsx',
        'src/components/CopyEmailLink.tsx',
        'src/components/Footer.tsx',
        'src/components/Monogram.tsx',
        'src/components/NavLink.tsx',
        'src/components/BackToTop.tsx',
        'src/components/ContactForm.tsx',
        'src/components/MagneticCTA.tsx',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        statements: 70,
        branches: 50,
      },
    },
  },
});
