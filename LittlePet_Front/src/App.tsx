import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // UserProvider 추가
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
import HospitalPage from './pages/Health/Hospital/HospitalPage';
import MapPage from './pages/Health/Hospital/Map';
import CarePage from './pages/CarePage';
import HospitalDetailPage from './pages/Health/Hospital/HospitalDetailPage';
import InfoPage from './pages/Health/Hospital/InfoPage';
import ReviewPage from './pages/Health/Hospital/ReviewPage';
import LocationPage from './pages/Health/Hospital/LocationPage';
import AddReviewPage from './pages/Health/Hospital/AddReviewPage';
import HomePage from '#/pages/HomePage';
import MyPage from '#/pages/MyPage';
import SplashScreen from '#/pages/SplashScreen';
import EditProfilePage from '#/pages/EditProfilePage';
import EditPetPage from '#/pages/EditPetPage';
import PetRegistration from '#/pages/PetRegistrationPage';
import HealthRootLayout from '#/layout/HealthRootLayout';
import HealthProfilePage from '#/pages/Health/Record/HealthProfilePage';
import PastRecordPage from '#/pages/Health/Record/PastRecordPage';
import AddHealthRecordPage from '#/pages/Health/Record/AddHealthRecordPage';
import CalendarPage from '#/pages/Health/Record/CalenderPage';
import CareMethodPage from '#/pages/CareMethod/CareMethod';
import PetDetailPage from '#/pages/CareMethod/PetDetailPage';
import CareDetailRootLayout from '#/layout/CareDetailRootLayout';

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
      { path: 'caremethod', element: <CareMethodPage /> },

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
      { path: 'community/add', element: <AddPage /> },
      {
        path: 'health',
        element: <HealthRootLayout />,
        children: [
          { index: true, element: <HealthProfilePage /> }, // 기본 경로 설정
          { path: 'record', element: <HealthProfilePage /> },
          { path: 'record/detail/:petId', element: <PastRecordPage /> },
          { path: 'record/add/:petId', element: <AddHealthRecordPage /> },
          { path: 'record/calendar/:petId', element: <CalendarPage /> },
          { path: 'hospital', element: <HospitalPage /> },
          {
            path: 'hospital/:hospitalId',
            element: <HospitalDetailPage />,
            children: [
              { index: true, element: <InfoPage /> },
              { path: 'info', element: <InfoPage /> },
              { path: 'review', element: <ReviewPage /> },
            ],
          },
        ],
      },

      {
        path: '/health/hospital/:hospitalId/location',
        element: <LocationPage />,
      },
      { path: '/health/hospital/:hospitalId/add', element: <AddReviewPage /> },
      {
        path: '/health/hospital/map',
        element: <MapPage />,
      },
      {
        path: '/community/add',
        element: <AddPage />,
      },
      {
        //추후 백에서 db로 주는 link에 맞춰서 수정 예정
        path: 'caremethod',
        element: <CareDetailRootLayout />,
        children: [
          { path: 'pet-detail/:speciesId', element: <PetDetailPage /> },
        ],
      },
      {
        path: '/care',
        element: <CarePage />,
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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
