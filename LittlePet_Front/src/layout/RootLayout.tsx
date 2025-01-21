import React, { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavbarTop from '#/components/Navbar/NavbarTop';

const RootLayout: FC = () => {
  const location = useLocation();

  // 로그인 페이지 여부 확인
  const isLoginPage = location.pathname === '/login';
  const isOnBoardingPage = location.pathname === '/onboarding';

  return (
    <div className='flex flex-col h-screen'>
      {/* Navbar */}
      {!isLoginPage && !isOnBoardingPage && (
        <div className='overflow-x-hidden'>
          <NavbarTop />
        </div>
      )}

      {/* Main content */}
      <div className='flex flex-1'>
        {/* Outlet for nested routes */}
        <main className='flex-1 bg-gray-50'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
