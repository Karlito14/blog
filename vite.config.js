import { build } from 'vite';
import { resolve } from 'path';

export default {
  server: {
    port: 3000,
  },
  root: 'src',
  build: {
    outdir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        form: resolve(__dirname, 'src/form/form.html'),
      },
    },
  },
};
