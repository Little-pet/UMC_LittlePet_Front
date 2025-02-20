import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '#/store/AuthStore';

// 커뮤니티 글 등록 버튼
const DesktopAddButton: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const handleNavigate = (): void => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/community/add');
    }
  };

  return <DesktopButton onClick={handleNavigate}>글쓰기</DesktopButton>;
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
