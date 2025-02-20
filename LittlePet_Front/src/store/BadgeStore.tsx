// store/badgeStore.ts
import { create } from 'zustand';
import axios from 'axios';

interface BadgeState {
  missingBadges: string[];
  fetchMissingBadge: (userId: number) => Promise<void>;
  fetchProgress: (userId: number, type: string) => Promise<string>;
}

export const useBadgeStore = create<BadgeState>((set) => ({
  missingBadges: [],

  fetchMissingBadge: async (userId: number) => {
    try {
      const response = await axios.get(
        `https://umclittlepet.shop/api/badge/${userId}/missingbadge`,
        { withCredentials: true }
      );
      set({ missingBadges: response.data.result });
      return response.data.result;
      console.log('획득하지 못한 뱃지 조회 성공', response.data);
    } catch (error) {
      console.error('획득하지 못한 뱃지 조회 실패:', error);
    }
  },
  fetchProgress: async (userId: number, type: string) => {
    try {
      const response = await axios.get(
        `https://umclittlepet.shop/api/badge/${userId}/${type}/progress`,
        { withCredentials: true }
      );
      console.log(type, '목표 뱃지 조회 성공', response.data);
      return response.data.result;
    } catch (error) {
      console.error(type, '목표 뱃지 조회 실패:', error);
    }
  },
}));
