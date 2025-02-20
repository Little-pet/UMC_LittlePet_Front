import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

//  API 요청 함수 (카테고리별 최신순 글 불러오기)
const fetchCategoryPosts = async ({
  pageParam = 0,
  category,
}: {
  pageParam: number;
  category: string;
}) => {
  const isPC = window.innerWidth >= 800;
  const deviceType = isPC ? 'pc' : 'mobile';

  let allPosts: any[] = [];

  //  최신순 정렬
  let url = `https://umclittlepet.shop/api/post?category=${encodeURIComponent(category)}&size=100&sort=${encodeURIComponent('최신순')}&deviceType=${deviceType}`;
  url += `&pageNum=0`;

  const response = await axios.get(url, { withCredentials: true });

  if (response.data.isSuccess) {
    allPosts = response.data.result || [];
  }

  console.log(' [fetchCategoryPosts] 최종 allPosts.length:', allPosts.length);

  //  15개씩 가져오기 (페이지네이션 적용)
  const startIdx = pageParam * 15;
  const paginatedPosts = allPosts.slice(startIdx, startIdx + 15);

  console.log(
    ' [fetchCategoryPosts] paginatedPosts.length:',
    paginatedPosts.length
  );
  console.log(' [fetchCategoryPosts] pageParam:', pageParam);

  //  `nextCursor` 설정 (데이터가 남아있으면 증가)
  const newCursor = startIdx + 15 < allPosts.length ? pageParam + 1 : null;
  console.log(' [fetchCategoryPosts] nextCursor:', newCursor);

  return {
    posts: paginatedPosts,
    nextCursor: newCursor,
  };
};

// 커스텀 훅: 커뮤니티 카테고리별 최신순 게시글
export const useCategoryPosts = (category: string) => {
  return useInfiniteQuery({
    queryKey: ['categoryPosts', category], //  카테고리별로 캐싱
    queryFn: ({ pageParam }) => fetchCategoryPosts({ pageParam, category }),
    getNextPageParam: (lastPage, allPages) => {
      console.log(' [getNextPageParam] lastPage:', lastPage);
      console.log(' [getNextPageParam] allPages.length:', allPages.length);

      if (!lastPage || lastPage.posts.length < 15) {
        console.log(
          ' [getNextPageParam] 다음 페이지 없음 (lastPage.posts.length < 15)'
        );
        return undefined;
      }

      console.log(' [getNextPageParam] 다음 페이지 있음:', lastPage.nextCursor);
      return lastPage.nextCursor ?? allPages.length;
    },
    initialPageParam: 0,
  });
};
