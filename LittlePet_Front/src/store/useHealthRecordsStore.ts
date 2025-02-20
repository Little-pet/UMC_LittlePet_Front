import { create } from 'zustand';
import axios from 'axios';

interface HealthRecordState {
  petId: string | null;
  recordDates: string[];
  fetchRecordDates: (petId: string) => Promise<void>;
}

export const useHealthRecordsStore = create<HealthRecordState>((set) => ({
  petId: null,
  recordDates: [],

  fetchRecordDates: async (petId: string) => {
    try {
      const response = await axios.get(
        `https://umclittlepet.shop/api/pets/${petId}/health-records/record-dates`,
        { withCredentials: true }
      );

      if (response.data.isSuccess) {
        set({ petId, recordDates: response.data.result });
      } else {
        set({ petId, recordDates: [] });
      }
    } catch (error) {
      console.log(error);
      set({ petId, recordDates: [] });
    }
  },
}));
