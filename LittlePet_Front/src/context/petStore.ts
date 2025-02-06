import { create } from 'zustand';
import axios from 'axios';

interface WeightChangeData {
  [petId: number]: {
    [date: string]: string | null; // 특정 날짜별 weightChange 저장
  };
}

interface Pet {
  petId: number;
  name: string;
  profilePhoto?: string;
}

interface PetStore {
  pets: Pet[];
  selectedPet: Pet | null;
  weightChanges: WeightChangeData;
  fetchPets: (userId: number) => Promise<void>;
  selectPet: (pet: Pet) => void;
  getPetName: (id: number) => string;
  setWeightChange: (
    petId: number,
    date: string,
    weightChange: string | null
  ) => void;
  getWeightChange: (petId: number, date: string) => string | null;
}

export const usePetStore = create<PetStore>((set, get) => ({
  pets: [],
  selectedPet: null,
  weightChanges: {}, // 초기 상태

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
      }
    } catch (error) {
      console.error('반려동물 목록 불러오기 실패:', error);
    }
  },

  selectPet: (pet) => set({ selectedPet: pet }),

  getPetName: (petId) => {
    return get().pets.find((pet) => pet.petId === petId)?.name || '알 수 없음';
  },

  // 특정 반려동물(petId) & 날짜(date) 별로 weightChange 저장
  setWeightChange: (petId, date, weightChange) => {
    set((state) => ({
      weightChanges: {
        ...state.weightChanges,
        [petId]: {
          ...state.weightChanges[petId],
          [date]: weightChange,
        },
      },
    }));
  },
  //  특정 반려동물(petId) & 날짜(date)별로 weightChange 조회
  getWeightChange: (petId, date) => {
    return get().weightChanges[petId]?.[date] ?? null;
  },
}));
