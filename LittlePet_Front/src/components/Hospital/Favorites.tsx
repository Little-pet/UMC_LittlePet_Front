// 건강-병원찾기 페이지에서 즐겨찾기 버튼
import styled from 'styled-components';
import FavoriteBlankIcon from '#/assets/favorite_blank.svg';
import FavoriteFullIcon from '#/assets/favorite_full.svg';
import { useState, useEffect, useMemo } from 'react';
import { useHospitalStore } from '#/store/hospitalStore';
import { useAuthStore } from '#/store/AuthStore';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 카테고리에 있는 검색 버튼
const FavoriteButton = ({ hospitalId }) => {
  const [selected, setSelected] = useState<boolean>();
  const { fetchScrappedHospitals, scrapHospital, unscriptHospital } =
    useHospitalStore();
  const { userId, isLoggedIn, checkLoginStatus } = useAuthStore();
  const navigate = useNavigate();

  // 스크랩된 병원 리스트
  const { data, isLoading } = useQuery({
    queryKey: ['scrappedHospital', userId],
    queryFn: () =>
      userId ? fetchScrappedHospitals(userId) : Promise.resolve(null),
    enabled: !!userId && !!hospitalId && !!isLoggedIn,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });

  //if (isLoading) return <Skeleton />;
  const isSelected = useMemo(() => {
    return (
      data?.some((hospital) => Number(hospital.id) === Number(hospitalId)) ??
      false
    );
  }, [data, hospitalId]);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  const handleClick = async () => {
    await checkLoginStatus();

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (selected === true) {
      unscriptHospital(hospitalId, userId);
      setSelected(false);
    } else {
      scrapHospital(hospitalId, userId);
      setSelected(true);
    }
  };

  return (
    <Container onClick={handleClick}>
      <img
        src={selected ? FavoriteFullIcon : FavoriteBlankIcon}
        alt='favorite-icon'
      />
    </Container>
  );
};

export default FavoriteButton;

const Container = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  padding: 12px 11px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 5px #00000040;
  cursor: pointer;
`;
const Skeleton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  box-sizing: border-box;
  box-shadow: 0px 2px 5px #00000040;
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  animation: skeleton-gradient 1.5s infinite ease-in-out;
`;
