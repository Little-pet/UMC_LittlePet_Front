import { Outlet, Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Category {
  type: string;
  title: string;
  path: string;
}
// 뒤로가기를 누르면 type이 복원이 안되는 문제 발생..
const HealthRootLayout: React.FC = () => {
  const categories: Category[] = [
    {
      type: 'record',
      title: '건강기록',
      path: '/health/record',
    },
    {
      type: 'hospital',
      title: '병원찾기',
      path: '/health/hospital',
    },
  ];

  const [selected, setSelected] = useState<string>('record');

  const handleClick = (type: string) => {
    setSelected(type);
  };

  return (
    <Container>
      <Header>
        <ItemContainer>
          {categories.map((category, index) => (
            <MenuItem
              key={index}
              to={category.path}
              onClick={() => handleClick(category.type)}
              isActive={selected === category.type}
            >
              {category.title}
            </MenuItem>
          ))}
        </ItemContainer>
      </Header>

      {/* 자식 라우트가 이 위치에서 렌더링 */}
      <Outlet />
    </Container>
  );
};

export default HealthRootLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
  overflow-y: auto; /* 세로 스크롤 */
  /* 크롬, 사파리, 오페라, 엣지에서 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }

  /* 인터넷 익스플로러에서 스크롤바 숨기기 */
  -ms-overflow-style: none;

  /* 파이어폭스에서 스크롤바 숨기기 */
  scrollbar-width: none;
  align-items: center; /* 중앙 정렬 */
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 42px;
  padding: 0 25px;
  border-bottom: 0.5px solid #d9d9d9;
  box-sizing: border-box;
  position: sticky;
`;
const ItemContainer = styled.div`
  display: flex;
  gap: 50px;
`;
const MenuItem = styled(Link)<{ isActive: boolean }>`
  font-family: Pretendard-Medium;
  line-height: 42px;
  font-size: 14px;
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? '#6EA8FE' : 'black')};
`;
