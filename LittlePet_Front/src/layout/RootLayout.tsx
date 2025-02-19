import { FC } from 'react';
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
  width: 100%;
  background-color: #fff;
  z-index: 10;
  position: fixed;
  top: 0;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 100%;
  height: calc(100vh - 50px - 45px);
  padding-top: 95px;
  margin: 0;

  box-sizing: border-box;
  overflow-y: auto; /* 세로 스크롤 */
  /* 크롬, 사파리, 오페라, 엣지에서 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }

  /* 인터넷 익스플로러에서 스크롤바 숨기기 */
  -ms-overflow-style: none;

  /* 파이어폭스에서 스크롤바 숨기기 */
  scrollbar-width: none;
`;
