import { RouteObject } from 'react-router-dom';
import { LoginPage, MainPage } from './pages';

const protectedRoutes = [
  {
    path: '/',
    element: <MainPage />,
  },
] as RouteObject[];

const publicRoutes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
] as RouteObject[];

export { protectedRoutes, publicRoutes };
