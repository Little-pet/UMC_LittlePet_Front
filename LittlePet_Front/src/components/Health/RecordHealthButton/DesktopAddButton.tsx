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

  return <DesktopButton onClick={handleNavigate}>기록하기</DesktopButton>;
};

export default DesktopAddButton;

const DesktopButton = styled.button`
  width: 100px;
  padding: 11px 8px;
  border: none;
  background-color: #6ea8fe;
  color: #ffffff;
  font-family: 'Pretendard-SemiBold';
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  align-self: flex-end;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.13);
  margin: 0;
  @media (max-width: 800px) {
    display: none;
  }
`;
