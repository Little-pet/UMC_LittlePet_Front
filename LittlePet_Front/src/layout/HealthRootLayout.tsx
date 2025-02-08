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
      link: '/health/record',
    },
    {
      type: 'hospital',
      title: '병원찾기',
      link: '/health/hospital',
    },
  ];

  /* const [selected, setSelected] = useState<string>('record'); */
  const location = useLocation();
  const [selected, setSelected] = useState<string>(
    localStorage.getItem('selectedCategory') || 'record'
  );
  const handleClick = (type: string) => {
    setSelected(type);
    localStorage.setItem('selectedCategory', type);
  };
  useEffect(() => {
    if (location.pathname === '/health') {
      // ✅ `/health` 진입 시 기본값 `record` 설정
      setSelected('record');
      localStorage.setItem('selectedCategory', 'record');
    }
    console.log(localStorage.getItem('selectedCategory'));
  }, [location.pathname]);
  return (
    <Container>
      <Header>
        <ItemContainer>
          {categories.map((category, index) => (
            <MenuItem
              key={index}
              to={category.link}
              onClick={() => handleClick(category.type)}
              isActive={selected === category.type}
            >
              {category.title}
            </MenuItem>
          ))}
        </ItemContainer>
      </Header>

      {/* 자식 라우트가 이 위치에서 렌더링 */}
      <MainContent>
        <Outlet />
      </MainContent>
    </Container>
  );
};

export default HealthRootLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 42px;
  padding: 0 25px;
  border-bottom: 0.5px solid #d9d9d9;
  box-sizing: border-box;
  width: 100%;
  @media (min-width: 800px) {
    min-height: 70px;
  }
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
  @media (min-width: 800px) {
    font-size: 22px;
    line-height: 35px;
    font-weight: 600;
  }
`;
const MainContent = styled.main`
  @media (min-width: 800px) {
  }
`;
