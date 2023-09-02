import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function RequireAuth() {
  const { auth } = useAuth();
  const { pathname } = useLocation();

  const href =
    pathname === '/'
      ? '/login'
      : `/login?callbackUrl=${encodeURIComponent(pathname)}`;

  return auth.accessToken ? <Outlet /> : <Navigate to={href} replace />;
}
