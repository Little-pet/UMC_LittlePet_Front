import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  server: {
    port: 5173, // ✅ 항상 5173 포트에서 실행
    strictPort: true, // ✅ 5173이 사용 중이면 실행을 중단 (다른 포트로 이동하지 않음)
    host: true, // 로컬 네트워크에서 접근 가능하도록 설정
  },
});
