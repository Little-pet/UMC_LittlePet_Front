import { create } from 'zustand';
import axios from 'axios';
interface Content {
  content: string;
  sequence: number;
}

export interface CommentType {
  commentId: number;
  content: string;
  createdTime: string;
  name: string;
  replies?: CommentType[];
  updatedTime: string;
  userPets: string[];
}
export interface CommunityPost {
  // 특정 글
  commentNum: number;
  comments: CommentType[];
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

  patchViews: (postId: number) => Promise<void>;
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
        { withCredentials: true }
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
        return;
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
        return response.data.result;
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

  patchViews: async (postId: number) => {
    try {
      const response = await axios.patch(
        `https://umclittlepet.shop/api/post/${postId}/view`,
        { withCredentials: true }
      );
      console.log('게시물 조회수 증가 성공', response.data);
    } catch (error) {
      console.error('게시물 조회수 증가 실패:', error);
      set({ isLoading: false });
    }
  },
}));
