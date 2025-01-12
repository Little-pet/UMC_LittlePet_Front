import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './font.css';
import CommunityRootLayout from './layout/community-root-layout';
import PopularPage from './pages/popular';
import QnaPage from './pages/qna';
import DailyPage from './pages/daily';
import AddPage from './pages/add';
import TotalPopularPage from './pages/totalPopular';
import TotalQnaPage from './pages/totalQna';
import TotalDailyPage from './pages/totalDaily';
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
        path: 'community/popular',
        element: <PopularPage />,
      },
      {
        path: 'community/popular/total',
        element: <TotalPopularPage />,
      },
      {
        path: 'community/qna',
        element: <QnaPage />,
      },
      {
        path: 'community/qna/total',
        element: <TotalQnaPage />,
      },
      {
        path: 'community/daily',
        element: <DailyPage />,
      },
      {
        path: 'community/daily/total',
        element: <TotalDailyPage />,
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
