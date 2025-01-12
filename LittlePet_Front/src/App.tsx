import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from '#/pages/LoginPage'; // LoginPage 컴포넌트
import RootLayout from '#/layout/RootLayout';
const router = createBrowserRouter([{
  path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
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
