import { Outlet, Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Category {
  type: string;
  title: string;
  path: string;
}
// 뒤로가기를 누르면 type이 복원이 안되는 문제 발생..
const CommunityRootLayout: React.FC = () => {
  const location = useLocation();
  const categories: Category[] = [
    {
      type: 'qna',
      title: 'Q&A',
      path: '/community/qna',
    },
    {
      type: 'daily',
      title: '일상',
      path: '/community/daily',
    },
    {
      type: 'challenge',
      title: '챌린지',
      path: '/community/challenge',
    },
  ];

  // ✅ `localStorage`에서 메뉴 상태 복원 (초기값: "qna")
  const [selected, setSelected] = useState<string>(
    localStorage.getItem('selectedCategory') || 'qna'
  );
  const handleClick = (type: string) => {
    setSelected(type);
    localStorage.setItem('selectedCategory', type);
  };
  useEffect(() => {
    if (location.pathname === '/community') {
      // ✅ `/community` 진입 시 기본값 `qna` 설정
      setSelected('qna');
      localStorage.setItem('selectedCategory', 'qna');
    }
    console.log(localStorage.getItem('selectedCategory'));
  }, [location.pathname]);

  const [totalHeight, setTotalHeight] = useState<number>(
    window.innerWidth < 768
      ? window.innerHeight - 50 - 45 - 42
      : window.innerHeight - 50 - 42
  );

  useEffect(() => {
    console.log(`📏 계산된 높이: ${totalHeight}px`);
  }, [window.innerHeight, window.innerWidth]);

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
      <MainContent totalHeight={totalHeight}>
        <Outlet />
      </MainContent>
    </Container>
  );
};

export default CommunityRootLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
const MainContent = styled.main<{ totalHeight: number }>`
  height: ${({ totalHeight }) => `${totalHeight}px`};
  position: relative;
  @media (min-width: 800px) {
  }
`;
