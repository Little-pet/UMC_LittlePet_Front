import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  // 환경 변수 로드
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tsconfigPaths()],

    define: {
      'import.meta.env': env, //  Vite 환경 변수 바인딩
    },
    server: { host: true },
  };
});
