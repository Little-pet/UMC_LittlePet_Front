import { create } from 'zustand';
import axios from 'axios';

interface User {
  name: string;
  profilePhoto?: string;
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
  selectedPet: Pet | null;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  updateUserData: (data: {
    name: string;
    profilePhoto: string;
    userPet: Pet[];
    postCount: number;
    commentCount: number;
    likeCount: number;
    reviewCount: number;
    scrapCount: number;
    userBadge: Badge[];
  }) => void;
  selectPet: (pet: Pet) => void;
  getUser: () => User | null;
  getPets: () => Pet[];
  getStats: () => Stats | null;
  getBadges: () => Badge[];
  getPetName: (petId: number) => string;
}

export const usePetStore = create<UserStore>((set, get) => ({
  user: null,
  pets: [],
  stats: null,
  badges: [],
  selectedPet: null,
  isLoading: false,
  setLoading: (value: boolean) => set({ isLoading: value }),
  updateUserData: (data) => {
    set({
      user: {
        name: data.name,
        profilePhoto: data.profilePhoto,
      },
      pets: data.userPet,
      stats: {
        postCount: data.postCount,
        commentCount: data.commentCount,
        likeCount: data.likeCount,
        reviewCount: data.reviewCount,
        scrapCount: data.scrapCount,
      },
      badges: data.userBadge,
    });
  },
  selectPet: (pet: Pet) => set({ selectedPet: pet }),
  getUser: () => get().user,
  getPets: () => get().pets,
  getStats: () => get().stats,
  getBadges: () => get().badges,
  getPetName: (petId: number) =>
    get().pets.find((pet) => pet.petId === petId)?.name || '알 수 없음',
}));
