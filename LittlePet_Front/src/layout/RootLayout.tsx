import React, { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '#/components/Navbar/Navbar';

const RootLayout: FC = () => {
  const location = useLocation();

  // 로그인 페이지 여부 확인
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      {!isLoginPage && (
        <div className="overflow-x-hidden">
          <Navbar />
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1">
        {/* Outlet for nested routes */}
        <main className="flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
