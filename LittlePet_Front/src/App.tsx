import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '#/pages/LoginPage';
import RootLayout from '#/layout/RootLayout';
import OnBoardingPage from '#/pages/OnBoardingPage';
import HomePage from '#/pages/HomePage';
import MyPage from '#/pages/MyPage';
import SplashScreen from '#/pages/SplashScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'onboarding', element: <OnBoardingPage /> },
      { path: 'mypage', element: <MyPage /> },
    ],
  },
]);

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem('isFirstVisit');

    if (!isFirstVisit) {
      setShowSplash(true);
      localStorage.setItem('isFirstVisit', 'true');
      setTimeout(() => {
        setShowSplash(false);
      }, 3000);
    }
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return <RouterProvider router={router} />;
};

export default App;
