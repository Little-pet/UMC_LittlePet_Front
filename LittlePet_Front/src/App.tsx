import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './font.css';
import CommunityRootLayout from './layout/community-root-layout';
import QnaPage from './pages/qna';
import DailyPage from './pages/daily';
import AddPage from './pages/add';
import DetailPage from './pages/detail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ChanllengePage from './pages/challenge';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CommunityRootLayout />,
    children: [
      {
        path: 'community/qna',
        element: <QnaPage />,
      },

      {
        path: 'community/daily',
        element: <DailyPage />,
      },

      {
        // PostId는 동적으로 변경될 수 있는 경로 변수
        path: 'community/:postId',
        element: <DetailPage />,
      },
      {
        path: 'community/challenge',
        element: <ChanllengePage />,
      },
    ],
  },
  {
    path: '/community/add',
    element: <AddPage />,
  },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
