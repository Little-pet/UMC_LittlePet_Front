import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import addIcon from '#/assets/add.svg';
import dayjs from 'dayjs';

interface MobileAddButtonProps {
  selectedDate: dayjs.Dayjs;
  recordData: unknown | null;
}

// 건강 기록 버튼
const MobileAddButton: React.FC<MobileAddButtonProps> = ({
  selectedDate,
  recordData,
}) => {
  const navigate = useNavigate();
  const { petId } = useParams<{ petId: string }>();

  const handleNavigate = (): void => {
    if (petId) {
      navigate(
        `/health/record/add/${petId}?date=${selectedDate.format('YYYY-MM-DD')}`,
        { state: { recordData } }
      );
    } else {
      console.error('petId를 찾을 수 없습니다.');
    }
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
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  border: none;

  /* 화면 크기에 따른 조정 */
  @media (min-width: 800px) {
    display: none;
  }
`;
