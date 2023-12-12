import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import compressionPlugin from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  // Define Dev Server (npx vite) settings
  server: {
    port: 4200,
    hmr: true,
    cors: true,
  },
  plugins: [
    reactPlugin({
      // Only run fast-refresh for src
      fastRefresh: true,
      include: 'src',

      // Add extra emotion engine features
      jsxImportSource: '@emotion/react',
    }),

    // Compress everything with Brotli while building, so we don't have to do it on the fly
    compressionPlugin({
      algorithm: 'brotli',
      filter: /\.(js|jsx|ts|tsx|css|svg|ico)$/i,
      verbose: false,
    }),
  ],
  esbuild: {
    target: 'esnext',
    format: 'esm',
  },
  build: {
    minify: true, // Set to false to disable minification entirely
    target: 'esnext', // Assumes native dynamic imports support
    sourcemap: 'inline',
  },
  test: {
    environment: 'js',
    globals: true,
    setupFiles: 'src/setupTest.ts',
  },
  resolve: {
    alias: [
      { find: '@/', replacement: 'src' },
    ],
  }
})
