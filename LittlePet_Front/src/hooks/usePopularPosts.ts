import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import axios from 'axios';

const fetchPopularPosts = async ({
  pageParam = 0,
  category,
  allPostsRef,
}: {
  pageParam: number;
  category: string;
  allPostsRef: React.MutableRefObject<any[]>;
}) => {
  const isPC = window.innerWidth >= 800;
  const deviceType = isPC ? 'pc' : 'mobile';

  // `allPostsRef`에서 기존 데이터 유지
  let allPosts: any[] = allPostsRef.current;

  // 첫 페이지(`pageParam === 0`)에서만 데이터 요청
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

        console.log(` ${cat}에서 가져온 게시물 개수:`, filteredPosts.length);
        allPosts = allPosts.concat(filteredPosts);
      }
    }

    // `allPostsRef`에 전체 데이터 저장
    allPostsRef.current = allPosts;
  }

  console.log(' [fetchPopularPosts] 최종 allPosts.length:', allPosts.length);

  // 좋아요 많은 순으로 정렬
  allPosts.sort((a, b) => b.likes - a.likes);

  // 15개씩 가져오기 (페이지네이션 적용)
  const startIdx = pageParam * 15;
  const paginatedPosts = allPosts.slice(startIdx, startIdx + 15);

  console.log(
    ' [fetchPopularPosts] paginatedPosts.length:',
    paginatedPosts.length
  );
  console.log('[fetchPopularPosts] pageParam:', pageParam);

  const newCursor = startIdx + 15 < allPosts.length ? pageParam + 1 : null;
  console.log(' [fetchPopularPosts] nextCursor:', newCursor);

  return {
    posts: paginatedPosts,
    nextCursor: newCursor,
  };
};

export const usePopularPosts = (category: string) => {
  //  `useRef`를 활용하여 `allPosts` 상태 유지
  const allPostsRef = useRef<any[]>([]);

  return useInfiniteQuery({
    queryKey: ['communityPosts', category],
    queryFn: ({ pageParam }) =>
      fetchPopularPosts({ pageParam, category, allPostsRef }),
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.posts.length < 15) {
        console.log(' [getNextPageParam] 다음 페이지 없음');
        return undefined;
      }

      console.log(' [getNextPageParam] 다음 페이지 있음:', lastPage.nextCursor);
      return lastPage.nextCursor;
    },
    initialPageParam: 0,
  });
};
