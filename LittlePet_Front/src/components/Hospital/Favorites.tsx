// 건강-병원찾기 페이지에서 즐겨찾기 버튼
import styled from 'styled-components';
import FavoriteBlankIcon from '#/assets/favorite_blank.svg';
import FavoriteFullIcon from '#/assets/favorite_full.svg';
import { useState, useEffect } from 'react';
import { useHospitalStore } from '#/context/hospitalStore';

// 카테고리에 있는 검색 버튼
const FavoriteButton = ({ isSelected, hospitalId }) => {
  const [selected, setSelected] = useState(isSelected);
  const { scrapHospital, unscriptHospital } = useHospitalStore();
  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);
  const handleClick = () => {
    if (selected === true) {
      unscriptHospital(hospitalId, 4);
    } else {
      scrapHospital(hospitalId, 4);
    }
    setSelected((prev) => !prev); // 상태를 토글
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
