import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from '#/pages/LoginPage'; // LoginPage 컴포넌트
import RootLayout from '#/layout/RootLayout';
import OnBoardingPage from '#/pages/OnBoardingPage';
const router = createBrowserRouter([{
  path: '/',
    element: <RootLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'onboarding', element: <OnBoardingPage /> },
      //{ path: 'mypage', element: <MyPage /> },
      //{ path: 'home', element: <HomePage /> },
    ],
}])
const App: React.FC= () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
    
  );
};

export default App;
