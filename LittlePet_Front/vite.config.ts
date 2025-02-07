import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '#': path.resolve(__dirname, 'src'),
    },
  },

  server: {
    host: true, // 로컬 네트워크에서 접근 가능하도록 설정
  },
});
