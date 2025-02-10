import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useUserStore } from '#/context/UserStore';

interface ApiResponse {
  isSuccess: boolean;
  result: {
    name: string;
    profilePhoto: string;
    introduction: string;
    userPet: any[]; // 필요에 따라 Pet[]로 변경
    postCount: number;
    commentCount: number;
    likeCount: number;
    reviewCount: number;
    scrapCount: number;
    userBadge: any[]; // 필요에 따라 Badge[]로 변경
  };
}

export const useGetUserData = (userId: number) => {
  return useQuery<ApiResponse, Error, [string, number]>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await axios.get(
        `https://umclittlepet.shop/api/users/${userId}`,
        { withCredentials: true }
      );

      const data = response.data;
      if (data.isSuccess) {
        console.log('사용자 프로필 조회 성공', data);
        const result = data.result;
        // 스토어 업데이트
        useUserStore.setState({
          user: {
            name: result.name,
            profilePhoto:
              result.profilePhoto == null || result.profilePhoto === 'null'
                ? 'default'
                : result.profilePhoto,
            introduction: result.introduction,
          },
          pets: result.userPet,
          stats: {
            postCount: result.postCount,
            commentCount: result.commentCount,
            likeCount: result.likeCount,
            reviewCount: result.reviewCount,
            scrapCount: result.scrapCount,
          },
          badges: result.userBadge,
        });
      }
      return data;
    },
  });
};
