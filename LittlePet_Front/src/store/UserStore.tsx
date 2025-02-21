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
  lastFetchedUserId: number | null; //마지막으로 fetch한 userId
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  pets: [],
  stats: null,
  badges: [],
  isLoading: false,
  lastFetchedUserId: null,

  fetchUser: async (userId: number) => {
    if (!userId) {
      console.log('userId 없음. fetchUser 실행 안 함.');
      return;
    }
    console.log(` fetchUser 실행됨! userId: ${userId}`);

    set({ isLoading: true });
    try {
      const response = await axios.get(
        `https://umclittlepet.shop/api/users/${userId}`,
        { withCredentials: true }
      );

      if (response.data.isSuccess) {
        console.log(' 사용자 프로필 조회 성공!', response.data);
        const result = response.data.result;

        // 이전 상태와 비교
        const prevUserId = get().lastFetchedUserId;
        const prevPets = get().pets;
        const prevUser = get().user;

        const userChanged =
          !prevUser || // 기존 user 정보가 없거나
          prevUser.name !== result.name ||
          prevUser.profilePhoto !== result.profilePhoto ||
          prevUser.introduction !== result.introduction;

        const petsChanged =
          JSON.stringify(prevPets) !== JSON.stringify(result.userPet || []);

        if (prevUserId !== userId || userChanged || petsChanged) {
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
            lastFetchedUserId: userId, //  마지막으로 불러온 userId 저장
          });

          console.log(' [UserStore] 상태 업데이트 완료:', get().user);
        } else {
          console.log(' [UserStore] 변경 없음, 상태 업데이트 생략');
        }
      }
    } catch (error) {
      console.error(' 사용자 프로필 조회 실패:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
