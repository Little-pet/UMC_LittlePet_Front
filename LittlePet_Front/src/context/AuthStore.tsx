import { create } from 'zustand';
import axios from 'axios';

// Zustand 스토어 타입 정의
interface AuthStore {
  isLoggedIn: boolean;
  userId: number | null;
  checkLoginStatus: () => Promise<void>; // 로그인 상태 확인 함수
}

// Zustand 스토어 생성
export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false, // 기본값 false
  userId: null, // 기본값 null

  // 로그인 상태 확인 함수
  checkLoginStatus: async () => {
    try {
      const response = await axios.get(
        'https://umclittlepet.shop/api/auth/status',
        { withCredentials: true }
      );

      if (response.data.loggedIn) {
        set({
          isLoggedIn: true,
          userId: response.data.userId,
        });
      } else {
        set({ isLoggedIn: false, userId: null });
      }
    } catch (error) {
      console.error('로그인 상태 확인 실패:', error);
      set({ isLoggedIn: false, userId: null });
    }
  },
}));
