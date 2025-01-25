import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // UserProvider 추가
import { PetProvider } from './context/PetContext'; // PetProvider 추가
import '#/font.css';
import CommunityRootLayout from '#/layout/CommunityRootLayout';
import QnaPage from '#/pages/QnaPage';
import DailyPage from '#/pages/DailyPage';
import AddPage from '#/pages/AddPage';
import DetailPage from '#/pages/DetailPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ChallengePage from '#/pages/ChallengePage';
import LoginPage from '#/pages/LoginPage';
import RootLayout from '#/layout/RootLayout';
import OnBoardingPage from '#/pages/OnBoardingPage';
import HomePage from '#/pages/HomePage';
import MyPage from '#/pages/MyPage';
import SplashScreen from '#/pages/SplashScreen';
import EditProfilePage from '#/pages/EditProfilePage';
import PetRegistration from '#/pages/PetRegistrationPage';
import EditPetPage from '#/pages/EditPetPage';

// 라우터 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/home', element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'onboarding', element: <OnBoardingPage /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'edit-profile', element: <EditProfilePage /> },
      { path: 'pet-register', element: <PetRegistration /> },
      { path: 'edit-pet/:petId', element: <EditPetPage /> },
      {
        path: 'community',
        element: <CommunityRootLayout />,
        children: [
          { index: true, element: <QnaPage /> }, // 기본 경로 설정
          { path: 'qna', element: <QnaPage /> },
          { path: 'daily', element: <DailyPage /> },
          { path: ':postId', element: <DetailPage /> },
          { path: 'challenge', element: <ChallengePage /> },
        ],
      },
      {
        path: '/community/add',
        element: <AddPage />,
      },
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

  const queryClient = new QueryClient();
  return (
    <UserProvider>
      <PetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PetProvider>
    </UserProvider>
  );
};

export default App;
