import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DataPage from './pages/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DataPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
