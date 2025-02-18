import { create } from 'zustand';
import axios from 'axios';

interface User {
  name: string;
  profilePhoto?: string;
  introduction?: string;
}
interface Stats {
  postCount: number;
  commentCount: number;
  likeCount: number;
  reviewCount: number;
  scrapCount: number;
}

interface Pet {
  petId: number;
  name: string;
  profilePhoto: string;
  petCategory: string;
}
interface Badge {
  name: string;
}

interface UserStore {
  user: User | null;
  pets: Pet[];
  stats: Stats | null;
  badges: Badge[];
  // 사용자 프로필 조회: API로부터 사용자 데이터를 받아와 상태에 저장
  fetchUser: (userId: number) => Promise<void>;
  isLoading: boolean;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  pets: [],
  stats: null,
  badges: [],
  isLoading: false,
  fetchUser: async (userId: number) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `https://umclittlepet.shop/api/users/${userId}`,
        { withCredentials: true }
      );
      if (response.data.isSuccess) {
        console.log('사용자 프로필 조회 성공', response.data);
        const result = response.data.result;

        //pets가 달라졌을 때에만 상태 업데이트
        const prevPets = get().pets;
        if (JSON.stringify(prevPets) !== JSON.stringify(result.userPet || [])) {
          set({
            user: {
              name: result.name,
              profilePhoto: result.profilePhoto,
              introduction: result.introduction,
            },
            pets: result.userPet || [],
            stats: {
              postCount: result.postCount ?? 0,
              commentCount: result.commentCount ?? 0,
              likeCount: result.likeCount ?? 0,
              reviewCount: result.reviewCount ?? 0,
              scrapCount: result.scrapCount ?? 0,
            },
            badges: result.userBadge || [],
          });
        } else {
          console.log('🔹 [UserStore] pets 변경 없음, 상태 업데이트 생략');
        }

        set({ isLoading: false }); //  isLoading 상태 업데이트
        console.log('[UserStore] Zustand 상태 업데이트 완료:', get().pets);
      }
    } catch (error) {
      console.error('사용자 프로필 조회 실패:', error);
      set({ isLoading: false });
    }
  },
}));
