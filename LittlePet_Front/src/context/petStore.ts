import { create } from 'zustand';
import axios from 'axios';

interface Pet {
  petId: number;
  name: string;
  profilePhoto?: string;
}

interface PetStore {
  pets: Pet[];
  selectedPet: Pet | null;

  fetchPets: (userId: number) => Promise<void>;
  selectPet: (pet: Pet) => void;
  getPetName: (id: number) => string;
}

export const usePetStore = create<PetStore>((set, get) => ({
  pets: [],
  selectedPet: null,

  fetchPets: async (userId: number) => {
    try {
      const response = await axios.get(
        `https://umclittlepet.shop/api/users/${userId}/pets/All`,
        { withCredentials: true }
      );

      if (response.data.isSuccess) {
        set({
          pets: response.data.result,
          selectedPet: response.data.result[0],
        });
        console.log(' Zustand 상태 업데이트됨:', usePetStore.getState().pets);
        console.log(usePetStore.getState().selectedPet);
      }
    } catch (error) {
      console.error('반려동물 목록 불러오기 실패:', error);
    }
  },

  selectPet: (pet) => set({ selectedPet: pet }),

  getPetName: (petId) => {
    return get().pets.find((pet) => pet.petId === petId)?.name || '알 수 없음';
  },
}));
