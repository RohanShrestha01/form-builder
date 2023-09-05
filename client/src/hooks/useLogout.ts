import { toast } from 'react-hot-toast';
import { initialAuthState, useAuth } from '../contexts/AuthContext';
import axios from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function useLogout() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const removeCookie = useCookies(['userDetails'])[2];

  const logout = async () => {
    try {
      await axios('/auth/logout', {
        withCredentials: true,
      });
      setAuth(initialAuthState);
      removeCookie('userDetails');
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  return logout;
}
