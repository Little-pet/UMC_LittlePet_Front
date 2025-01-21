
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '#/font.css';
import CommunityRootLayout from '#/layout/community-root-layout';
import QnaPage from '#/pages/qna';
import DailyPage from '#/pages/daily';
import AddPage from '#/pages/add';
import DetailPage from '#/pages/detail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ChanllengePage from '#/pages/challenge';
import React from 'react';
import LoginPage from '#/pages/LoginPage'; // LoginPage 컴포넌트
import RootLayout from '#/layout/RootLayout';
import OnBoardingPage from '#/pages/OnBoardingPage';
import HomePage from './pages/HomePage';
//import MyPage from './pages/MyPage';


const router = createBrowserRouter([
   {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'onboarding', element: <OnBoardingPage /> },
    ],
  },
  {
    path: '/community',
    element: <CommunityRootLayout />,
    children: [
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
]);



export default App;
