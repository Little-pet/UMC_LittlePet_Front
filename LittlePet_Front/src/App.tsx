import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // UserProvider 추가
import { PetProvider } from './context/PetContext'; // PetProvider 추가
import LoginPage from '#/pages/LoginPage';
import RootLayout from '#/layout/RootLayout';
import OnBoardingPage from '#/pages/OnBoardingPage';
import HomePage from '#/pages/HomePage';
import MyPage from '#/pages/MyPage';
import SplashScreen from '#/pages/SplashScreen';
import EditProfilePage from './pages/EditProfilePage';
import PetRegistration from './components/MyPageSections/PetRegistration';

// 라우터 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'onboarding', element: <OnBoardingPage /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'edit-profile', element: <EditProfilePage /> },
      { path: 'pet-register', element: <PetRegistration /> },
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

  return (
    <UserProvider>
      <PetProvider>
        <RouterProvider router={router} />
      </PetProvider>
        
      
    </UserProvider>
  );
};

export default App;
