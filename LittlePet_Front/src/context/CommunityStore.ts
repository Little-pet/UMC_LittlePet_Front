import { create } from 'zustand';
import axios from 'axios';
interface Content {
  content: string;
  sequence: number;
}

interface Comment {
  commentId: number;
  content: string;
  createdTime: string;
  name: string;
  replies?: Comment[];
  updatedTime: string;
  userPets: string[];
}
export interface CommunityPost {
  // 특정 글
  commentNum: number;
  comments: Comment[];
  contents: Content[];
  createdTime: string;
  id: number;
  likes: number;
  petCategory: string;
  postTitle: string;
  updatedTime: string;
  userBadges: string[];
  userName: string;
  views: number;
}
export interface CommunityPosts {
  // 글 리스트
  comments: number;
  contents: Content[];
  createdTime: string;
  likes: number;
  petCategory: string;
  postId: number;
  title: string;
  userId: number;
  userName: string;
  views: number;
  category?: string;
}
interface CommunityStore {
  posts: CommunityPosts[]; // 글 리스트
  currentPost: CommunityPost | null; // 특정 글
  isLoading: boolean;
  popularPosts: CommunityPosts[];
  // 커뮤니티 글 목록 조회 (기본값은 Q&A 카테고리, 최신순 등)
  fetchPosts: (category?: string, sort?: string) => Promise<void>;
  // 커뮤니티 특정 글 조회
  fetchPost: (postId: number) => Promise<void>;
  // 커뮤니티 게시물 삭제
  deletePost: (postId: number) => Promise<void>;
  fetchPopularPosts: () => Promise<void>;
}

export const useCommunityStore = create<CommunityStore>((set) => ({
  posts: [],
  currentPost: null,
  isLoading: false,
  popularPosts: [],
  fetchPosts: async (category: string, sort: string) => {
    set({ isLoading: true });
    try {
      const encodedCategory = encodeURIComponent(category);
      const encodedSort = encodeURIComponent(sort);
      const response = await axios.get(
        `https://umclittlepet.shop/api/post?category=${encodedCategory}&pageNum=0&size=10&sort=${encodedSort}&deviceType=pc`,
        {
          withCredentials: true,
        }
      );
      if (response.data.isSuccess) {
        const posts: CommunityPosts[] = response.data.result || [];
        set({ posts, isLoading: false });
        const postsWithCategory = posts.map((post) => ({ ...post, category }));
        const popularPosts = postsWithCategory.filter(
          (post) => post.likes > 30
        );
        set({ popularPosts });
        console.log(
          sort,
          category,
          ' 커뮤니티 글 목록 조회 성공',
          response.data
        );
      }
    } catch (error) {
      console.error('커뮤니티 글 목록 조회 실패:', error);
      set({ isLoading: false });
    }
  },

  fetchPost: async (postId: number) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `https://umclittlepet.shop/api/post/${postId}?deviceType=pc`,
        { withCredentials: true }
      );
      if (response.data.isSuccess) {
        set({ currentPost: response.data.result, isLoading: false });
        console.log('커뮤니티 특정 글 조회 성공', response.data);
      }
    } catch (error) {
      console.error('커뮤니티 특정 글 조회 실패:', error);
      set({ isLoading: false });
    }
  },

  deletePost: async (postId: number) => {
    set({ isLoading: true });
    try {
      const response = await axios.delete(
        `https://umclittlepet.shop/api/post/${postId}`,
        { withCredentials: true }
      );
      if (response.data.isSuccess) {
        // 삭제된 게시물을 제외한 나머지 게시물 목록으로 업데이트
        set((state) => ({
          posts: state.posts.filter((post) => post.postId !== postId),
          isLoading: false,
        }));
        console.log('커뮤니티 게시물 삭제 성공', response.data);
      }
    } catch (error) {
      console.error('커뮤니티 게시물 삭제 실패:', error);
      set({ isLoading: false });
    }
  },
  fetchPopularPosts: async () => {
    set({ isLoading: true });
    try {
      // 세 카테고리: Q&A, 일상, 챌린지
      const categories = ['Q&A', '일상', '챌린지'];
      let allPosts: CommunityPosts[] = [];
      for (const category of categories) {
        const response = await axios.get(
          `https://umclittlepet.shop/api/post?category=${encodeURIComponent(
            category
          )}&pageNum=0&size=10&sort=${encodeURIComponent('최신순')}&deviceType=pc`,
          { withCredentials: true }
        );
        if (response.data.isSuccess) {
          // 각 게시물에 카테고리 정보 추가
          const posts: CommunityPosts[] = (response.data.result || []).map(
            (post: CommunityPosts) => ({ ...post, category })
          );
          allPosts = allPosts.concat(posts);
        }
      }
      // 좋아요 30개 이상인 게시물 필터링, 좋아요 많은 순 정렬
      const popularPosts = allPosts
        .filter((post) => post.likes >= 30)
        .sort((a, b) => b.likes - a.likes);
      set({ popularPosts, isLoading: false });
      console.log('인기 게시물 조회 성공', popularPosts);
    } catch (error) {
      console.error('인기 게시물 조회 실패:', error);
      set({ isLoading: false });
    }
  },
}));
