import { useAuth } from '../contexts/AuthContext';
import axios from '../lib/axios';

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/auth/refresh', {
      withCredentials: true,
    });
    setAuth(prev => ({ ...prev, accessToken: response.data.accessToken }));
    return response.data.accessToken;
  };

  return refresh;
}
