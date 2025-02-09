import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePetStore } from '#/context/UserStore';

interface ApiResponse {
  isSuccess: boolean;
  result: {
    name: string;
    profilePhoto: string;
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
  return useQuery<ApiResponse>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await axios.get(
        `https://umclittlepet.shop/api/users/${userId}`,
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.isSuccess) {
        const result = data.result;
        // 스토어 업데이트
        usePetStore.setState({
          user: {
            name: result.name,
            profilePhoto: result.profilePhoto,
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
    },
  });
};
