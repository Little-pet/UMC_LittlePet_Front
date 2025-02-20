import { create } from 'zustand';
import axios from 'axios';

export interface Hospital {
  id: number;
  name: string;
  address: string;
  closedDay: string;
  latitude?: number;
  longitude?: number;
  imageUrl: string;
  openingHours: string;
  phoneNumber: string;
  rating: number;
  open: boolean;
}
interface HospitalStore {
  scrappedHospitals: Hospital[] | null; // 스크랩한 병원 목록
  hospitalDetail: Hospital | null; // 선택한 병원 상세 정보
  hospitalsByRegion: Hospital[] | undefined; // 특정 지역의 병원 목록
  hospitalsByFilter: Hospital[] | undefined; // 필터링된 병원
  // 병원 상세 조회
  fetchHospitalDetail: (hospitalId: number) => Promise<void>;
  // 병원 스크랩
  scrapHospital: (hospitalId: number, userId: number) => Promise<void>;
  // 병원 스크랩 취소
  unscriptHospital: (hospitalId: number, userId: number) => Promise<void>;
  // 스크랩한 병원 조회
  fetchScrappedHospitals: (userId: number) => Promise<void>;
  // 지역별 병원 조회
  fetchHospitalsByRegion: (areaId: number) => Promise<void>;
  // 병원 필터링해서 조회
  fetchHospitalsByFilter: (filter: string) => Promise<void>;
}

export const useHospitalStore = create<HospitalStore>((set) => ({
  scrappedHospitals: [],
  hospitalDetail: null,
  hospitalsByRegion: [],
  hospitalsByFilter: [],
  // 병원 상세 조회
  fetchHospitalDetail: async (hospitalId: number) => {
    try {
      const response = await axios.get(
        `https://umclittlepet.shop/api/hospitals/${hospitalId}`,
        { withCredentials: true }
      );
      console.error('병원 상세 조회 성공:', response.data);
      if (response.data.isSuccess) {
        set({ hospitalDetail: response.data.result });
        return response.data.result;
      }
    } catch (error) {
      console.error('병원 상세 조회 실패:', error);
    }
  },

  // 병원 스크랩 (즐겨찾기)
  scrapHospital: async (hospitalId: number, userId: number) => {
    try {
      const response = await axios.post(
        `https://umclittlepet.shop/api/hospitals/${hospitalId}?userId=${userId}`,
        null,
        { withCredentials: true }
      );
      console.log('병원 스크랩 성공:', response.data);
      // 필요하다면 스크랩한 병원 목록을 다시 불러오거나,
      // store 업데이트 로직을 추가합니다.
    } catch (error) {
      console.error('병원 스크랩 실패:', error);
    }
  },

  // 병원 스크랩 취소
  unscriptHospital: async (hospitalId: number, userId: number) => {
    try {
      const response = await axios.delete(
        `https://umclittlepet.shop/api/hospitals/${hospitalId}?userId=${userId}`,
        { withCredentials: true }
      );
      console.log('병원 스크랩 취소 성공:', response.data);
      // 스크랩한 병원 목록에서 해당 병원을 제거합니다.
      set((state) => ({
        scrappedHospitals: state.scrappedHospitals.filter(
          (hospital) => hospital.id !== hospitalId
        ),
      }));
    } catch (error) {
      console.error('병원 스크랩 취소 실패:', error);
    }
  },

  // 스크랩한 병원 조회
  fetchScrappedHospitals: async (userId: number) => {
    try {
      const response = await axios.get(
        `https://umclittlepet.shop/api/hospitals/users/{userId}?userId=${userId}`,
        { withCredentials: true }
      );
      console.log('스크랩한 병원 조회 성공:', response.data);
      if (response.data.isSuccess) {
        set({ scrappedHospitals: response.data.result });
        return response.data.result;
      }
    } catch (error) {
      console.error('스크랩한 병원 조회 실패:', error);
    }
  },

  // 지역별 병원 조회
  fetchHospitalsByRegion: async (areaId: number) => {
    try {
      const response = await axios.get(
        `https://umclittlepet.shop/api/hospitals/search/{placeId}?placeId=${areaId}`,
        { withCredentials: true }
      );
      console.log('지역별 병원 조회 성공:', response.data);
      if (response.data.isSuccess) {
        set({ hospitalsByRegion: response.data.result });
        return response.data.result;
      }
    } catch (error) {
      console.error('지역별 병원 조회 실패:', error);
      return [];
    }
  },
  // 병원 필터링해서 조회
  fetchHospitalsByFilter: async (filter: string) => {
    try {
      const encodedFilter = encodeURIComponent(filter);
      const response = await axios.get(
        `https://umclittlepet.shop/api/hospitals/filter?filterType=${encodedFilter}`,
        { withCredentials: true }
      );
      console.log(filter, '병원 필터링해서 조회 성공: ', response.data);
      if (response.data.isSuccess) {
        set({ hospitalsByFilter: response.data.result });
        return response.data.result;
      }
    } catch (error) {
      console.error('병원 필터링해서 조회 실패:', error);
    }
  },
}));
