import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import useRefreshToken from '../../hooks/useRefreshToken';
import { initialAuthState, useAuth } from '../../contexts/AuthContext';
import LoadingSvg from '../../assets/loading.svg';

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, setAuth, persist } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      if (!initialized.current) {
        try {
          initialized.current = true;
          await refresh();
        } catch (error) {
          const href =
            pathname === '/'
              ? '/login'
              : `/login?callbackUrl=${encodeURIComponent(pathname)}`;

          setAuth(initialAuthState);
          navigate(href, { replace: true });
        } finally {
          isMounted && setIsLoading(false);
        }
      }
    };

    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [refresh, auth, persist, navigate, pathname, setAuth]);

  return !persist ? (
    <Outlet />
  ) : isLoading ? (
    <img src={LoadingSvg} alt="Loading Spinner" className="mx-auto mt-8 h-20" />
  ) : (
    <Outlet />
  );
}
