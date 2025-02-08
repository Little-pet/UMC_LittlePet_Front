import { create } from 'zustand';
import axios from 'axios';

interface User {
  name: string;
  profilePhoto?: string;
  profilePhoto?: string;
}
interface Stats {
  postCount: number;
  commentCount: number;
  likeCount: number;
  reviewCount: number;
  scrapCount: number;
}

interface Pets {
  petId: number;
  name: string;
  profilePhoto: string;
  petCategory: string;
}
interface Badge {
  name: string;
}

interface UserStore {
  pets: Pet[];
  selectedPet: Pet | null;
  fetchAll: (userId: number) => Promise<void>;
  fetchUser: () => void;
  fetchPets: () => void;
  fetchStats: () => void;
  fetchBadges: () => void;
}

export const usePetStore = create<PetStore>((set, get) => ({
  pets: [],
  selectedPet: null,

  fetchPets: async (userId: number) => {
    try {
      const response = await axios.get(
        `https://umclittlepet.shop/api/users/${userId}`,
        { withCredentials: true }
      );

      if (response.data.isSuccess) {
        set({
          pets: response.data.result,
          //selectedPet: response.data.result[0],
        });
      }
      console.log(pets);
    } catch (error) {
      console.error('반려동물 목록 불러오기 실패:', error);
    }
  },

  selectPet: (pet) => set({ selectedPet: pet }),

  getPetName: (petId) => {
    return get().pets.find((pet) => pet.petId === petId)?.name || '알 수 없음';
  },
}));
