// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: './public',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: './public/index.html',
      external: ['./src/multiplication.js', './src/visualization.js', './src/sketch_japanese_method.js', './src/sketch_regular_method.js', './src/sketch_grid_method.js'],
      output: {
        globals: {
          'sketch_japanese_method.js': 'drawLines',
          'sketch_regular_method.js': 'drawRegularVisualization',
          'sketch_grid_method.js': 'drawGridMethod'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
