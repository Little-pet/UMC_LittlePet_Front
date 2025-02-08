import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';

interface DesktopAddButtonProps {
  selectedDate: dayjs.Dayjs;
}

const DesktopAddButton: React.FC<DesktopAddButtonProps> = ({
  selectedDate,
}) => {
  const navigate = useNavigate();
  const { petId } = useParams<{ petId: string }>();

  const handleNavigate = (): void => {
    if (petId) {
      navigate(
        `/health/record/add/${petId}?date=${selectedDate.format('YYYY-MM-DD')}`
      );
    } else {
      console.error('petId를 찾을 수 없습니다.');
    }
  };

  return (
    <DesktopButton onClick={handleNavigate}>기록하기 / 수정하기</DesktopButton>
  );
};

export default DesktopAddButton;

const DesktopButton = styled.button`
  background-color: #6ea8fe;
  color: white;
  height: 48px;
  font-family: 'Pretendard';
  font-weight: 600;
  padding: 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 197px;

  margin: 0;
  @media (max-width: 800px) {
    display: none;
  }
`;
