import React, { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NavbarTop from '#/components/Navbar/NavbarTop';

const RootLayout: FC = () => {
  const location = useLocation();

  // 로그인 페이지 여부 확인
  const isLoginPage = location.pathname === '/login';
  const isOnBoardingPage = location.pathname === '/onboarding';

  return (
    <RootContainer>
      {/* Navbar */}
      {!isLoginPage && !isOnBoardingPage && (
        <NavbarContainer>
          <NavbarTop />
        </NavbarContainer>
      )}

      {/* Main content */}
      <MainContent>
        <Outlet />
      </MainContent>
    </RootContainer>
  );
};

export default RootLayout;

// Styled Components
const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 10;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  margin-top: 95px;
  @media (min-width: 768px) {
    margin-top: 71px;
  }
`;
