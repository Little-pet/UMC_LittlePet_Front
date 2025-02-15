import { defineConfig, loadEnv } from 'vite';
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

export default defineConfig(({ mode }) => {
  // 환경 변수 로드
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        '#': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      'import.meta.env': env, // ✅ Vite 환경 변수 바인딩
    },
    server: {
      host: true,
    },
  };
});
