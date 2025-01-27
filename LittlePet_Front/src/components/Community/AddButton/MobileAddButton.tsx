import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import addIcon from '#/assets/add.svg';

// 커뮤니티 글 등록 버튼
const MobileAddButton: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(
      `/health/record/add/${petId}?date=${selectedDate.format('YYYY-MM-DD')}`
    );
  };
  return (
    <AddButtonWrapper onClick={handleNavigate}>
      <img src={addIcon} />
    </AddButtonWrapper>
  );
};

export default MobileAddButton;
const AddButtonWrapper = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #6ea8fe;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  border: none;
  @media (min-width: 800px) {
    display: none;
  }
`;
