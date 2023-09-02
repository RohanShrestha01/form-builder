import { toast } from 'react-hot-toast';
import { initialAuthState, useAuth } from '../contexts/AuthContext';
import axios from '../lib/axios';

export default function useLogout() {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth(initialAuthState);
    try {
      await axios('/auth/logout', {
        withCredentials: true,
      });
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  return logout;
}
