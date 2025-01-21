import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '#/font.css';
import CommunityRootLayout from '#/layout/CommunityRootLayout';
import QnaPage from '#/pages/QnaPage';
import DailyPage from '#/pages/DailyPage';
import AddPage from '#/pages/AddPage';
import DetailPage from '#/pages/DetailPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ChallengePage from '#/pages/ChallengePage';
import React from 'react';
import LoginPage from '#/pages/LoginPage'; // LoginPage 컴포넌트
import RootLayout from '#/layout/RootLayout';
import OnBoardingPage from '#/pages/OnBoardingPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/home', element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'onboarding', element: <OnBoardingPage /> },
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
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
