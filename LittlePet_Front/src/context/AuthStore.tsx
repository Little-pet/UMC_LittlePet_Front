import { create } from 'zustand';
import axios from 'axios';

// Zustand 스토어 타입 정의
interface AuthStore {
  isLoggedIn: boolean;
  checkLoginStatus: () => Promise<void>; // 로그인 상태 확인 함수
}

// Zustand 스토어 생성
export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false, // 기본값 false

  // 로그인 상태 확인 함수
  checkLoginStatus: async () => {
    try {
      const response = await axios.get(
        'https://umclittlepet.shop/api/auth/status',
        { withCredentials: true }
      );
      set({ isLoggedIn: response.data.loggedIn }); // 로그인 상태 업데이트
    } catch (error) {
      console.error(' 로그인 상태 확인 실패:', error);
      set({ isLoggedIn: false });
    }
  },
}));
