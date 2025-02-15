import React, { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const CareDetailRootLayout: React.FC = () => {
  //  각 섹션의 ref 생성
  const featureRef = useRef<HTMLDivElement>(null);
  const foodRef = useRef<HTMLDivElement>(null);
  const environmentRef = useRef<HTMLDivElement>(null);
  const playRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string>('feature');

  // 스크롤 이동 및 Active 상태 업데이트 함수
  const handleNavClick = (section: string) => {
    setSelected(section); // 선택된 상태 업데이트
    scrollToSection(section); // 해당 섹션으로 스크롤 이동
  };

  //  스크롤 이동 함수
  const scrollToSection = (section: string) => {
    const sectionRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      feature: featureRef,
      food: foodRef,
      environment: environmentRef,
      play: playRef,
    };

    const targetRef = sectionRefs[section];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Container>
      {/* 네비게이션 바 */}
      <StickyNav>
        <NavButton
          onClick={() => handleNavClick('feature')}
          isActive={selected === 'feature'}
        >
          특징
        </NavButton>
        <NavButton
          onClick={() => handleNavClick('food')}
          isActive={selected === 'food'}
        >
          먹이
        </NavButton>
        <NavButton
          onClick={() => handleNavClick('environment')}
          isActive={selected === 'environment'}
        >
          환경
        </NavButton>
        <NavButton
          onClick={() => handleNavClick('play')}
          isActive={selected === 'play'}
        >
          놀이방법
        </NavButton>
      </StickyNav>

      {/* 현재 라우트의 자식 컴포넌트(HamsterDetailPage 등)를 표시 */}
      <Outlet context={{ featureRef, foodRef, environmentRef, playRef }} />
    </Container>
  );
};

export default CareDetailRootLayout;

//Styled Components
const Container = styled.div``;

const StickyNav = styled.div`
  position: fixed;
  top: 95px;
  background-color: white;
  width: 100%;
  height: 45px;
  z-index: 1000;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  border-bottom: 0.5px solid #d9d9d9;
  border-top: 0.5px solid #d9d9d9;
  gap: 50px;
  padding: 0 25px;
  @media (min-width: 800px) {
    height: 70px;
  }
`;

const NavButton = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Pretendard';
  color: ${({ isActive }) => (isActive ? '#6EA8FE' : '#262627')};
  padding: 0;
  @media (min-width: 800px) {
    height: 70px;
    font-weight: 600;
    font-size: 22px;
    line-height: 35px;
  }
`;
