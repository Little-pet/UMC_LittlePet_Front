import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

//  API 요청 함수 (카테고리별 최신순 글 불러오기)

// ✅ 카테고리별 게시글을 무한스크롤 방식으로 가져오는 함수
const fetchCategoryPosts = async ({
  pageParam = null,
  category,
  sortType = '최신순',
}: {
  pageParam: number | null;
  category: string;
  sortType: '최신순' | '인기순';
}) => {
  const isPC = window.innerWidth >= 800;
  const deviceType = isPC ? 'pc' : 'mobile';

  // ✅ API 요청 URL
  let url = `https://umclittlepet.shop/api/post?category=${encodeURIComponent(
    category
  )}&size=15&sort=${encodeURIComponent(sortType)}&deviceType=${deviceType}`;

  // ✅ 무한스크롤: 첫 페이지가 아니면 `cursorId` 추가
  if (pageParam) {
    url += `&cursorId=${pageParam}`;
  }

  const response = await axios.get(url, { withCredentials: true });

  const allPosts = response.data.isSuccess ? response.data.result || [] : [];

  console.log(
    `📌 [fetchCategoryPosts] ${category} - ${sortType} 불러옴:`,
    allPosts.length
  );

  // ✅ 인기순이면 좋아요 개수 기준으로 내림차순 정렬
  if (sortType === '인기순') {
    allPosts.sort((a, b) => b.likes - a.likes);
  }

  // ✅ 다음 페이지를 위한 `nextCursor` 설정
  const nextCursor =
    allPosts.length > 0 ? allPosts[allPosts.length - 1].postId : null;
  console.log('📌 [fetchCategoryPosts] nextCursor:', nextCursor);

  return {
    posts: allPosts,
    nextCursor,
  };
};

// ✅ `useCategoryPosts` 커스텀 훅: 무한스크롤로 최신순/인기순 적용
export const useCategoryPosts = (
  category: string,
  sortType: '최신순' | '인기순' = '최신순'
) => {
  return useInfiniteQuery({
    queryKey: ['categoryPosts', category, sortType], // ✅ 카테고리별로 캐싱
    queryFn: ({ pageParam }) =>
      fetchCategoryPosts({ pageParam, category, sortType }),
    getNextPageParam: (lastPage) => {
      console.log('📌 [getNextPageParam] lastPage:', lastPage);
      return lastPage.nextCursor ?? undefined;
    },
    initialPageParam: null,
  });
};
