import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';

interface DesktopAddButtonProps {
  selectedDate: dayjs.Dayjs;
}

// 커뮤니티 글 등록 버튼
const DesktopAddButton: React.FC<DesktopAddButtonProps> = ({
  selectedDate,
}) => {
  const navigate = useNavigate();
  const { petId } = useParams<{ petId: string }>();
  const [searchParams] = useSearchParams();
  const date =
    searchParams.get('date') || new Date().toISOString().split('T')[0];
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
