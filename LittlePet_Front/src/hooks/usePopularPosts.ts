import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPopularPosts = async ({
  pageParam = 0,
  category,
  context,
}: {
  pageParam: number;
  category: string;
  context?: any;
}) => {
  const isPC = window.innerWidth >= 800;
  const deviceType = isPC ? 'pc' : 'mobile';

  // 이전 페이지의 데이터를 유지하도록 `context`에서 `allPosts` 가져오기
  let allPosts: any[] = context?.allPosts || [];

  // 첫 페이지(`pageParam = 0`)일 때만 새 데이터를 요청하여 `allPosts`를 초기화
  if (pageParam === 0 || allPosts.length === 0) {
    allPosts = [];
    const categories =
      category === 'popular' ? ['Q&A', '일상', '챌린지'] : [category];

    for (const cat of categories) {
      let url = `https://umclittlepet.shop/api/post?category=${encodeURIComponent(cat)}&size=100&sort=${encodeURIComponent('좋아요순')}&deviceType=${deviceType}`;
      url += `&pageNum=0`;

      const response = await axios.get(url, { withCredentials: true });

      if (response.data.isSuccess) {
        const filteredPosts = (response.data.result || [])
          .filter((post: any) => post.likes >= 30)
          .map((post: any) => ({
            ...post,
            category: cat,
          }));

        console.log(filteredPosts.length);
        allPosts = allPosts.concat(filteredPosts);
      }
    }
  }

  console.log(' [fetchPopularPosts] 최종 allPosts.length:', allPosts.length);

  // 좋아요 많은 순으로 정렬
  allPosts.sort((a, b) => b.likes - a.likes);

  //  15개씩 가져오기 (페이지네이션 적용)
  const startIdx = pageParam * 15;
  const paginatedPosts = allPosts.slice(startIdx, startIdx + 15);

  console.log(
    ' [fetchPopularPosts] paginatedPosts.length:',
    paginatedPosts.length
  );
  console.log(' [fetchPopularPosts] pageParam:', pageParam);

  const newCursor = startIdx + 15 < allPosts.length ? pageParam + 1 : null;
  console.log(' [fetchPopularPosts] nextCursor:', newCursor);

  return {
    posts: paginatedPosts,
    nextCursor: newCursor,
    allPosts, //  `context`로 `allPosts` 유지
  };
};

export const usePopularPosts = (category: string) => {
  return useInfiniteQuery({
    queryKey: ['communityPosts', category],
    queryFn: ({ pageParam, context }) =>
      fetchPopularPosts({ pageParam, category, context }),
    getNextPageParam: (lastPage, allPages) => {
      console.log(' [getNextPageParam] lastPage:', lastPage);
      console.log(' [getNextPageParam] allPages.length:', allPages.length);

      if (!lastPage || lastPage.posts.length < 15) {
        console.log(' [getNextPageParam] 다음 페이지 없음');
        return undefined;
      }

      console.log(lastPage.nextCursor);
      return lastPage.nextCursor ?? allPages.length;
    },
    initialPageParam: 0,
    context: {}, //  `context`를 유지하여 `allPosts`가 초기화되지 않도록 함
  });
};
