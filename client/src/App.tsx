import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/auth/Login';
import AuthLayout from './layouts/AuthLayout';
import Signup from './pages/auth/Signup';
import RecoverPassword from './pages/auth/RecoverPassword';
import SSOLogin from './pages/auth/SSOLogin';
import ResetPassword from './pages/auth/ResetPassword';
import RequireAuth from './components/auth/RequireAuth';
import HomePage from './pages/HomePage';
import BaseLayout from './layouts/BaseLayout';
import PersistLogin from './components/auth/PersistLogin';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/sso/login',
        element: <SSOLogin />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/recover-password',
        element: <RecoverPassword />,
      },
      {
        path: '/reset-password/:token',
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <PersistLogin />,
    errorElement: <Error />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            element: <BaseLayout />,
            children: [
              {
                path: '/',
                element: <HomePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
