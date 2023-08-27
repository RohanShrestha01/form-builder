import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';

import { getDecryptedData } from '@/utils';

export const initialAuthState = {
  accessToken: '',
  idx: '',
  fullName: '',
  email: '',
  avatar: '',
};

interface AuthContextType {
  auth: typeof initialAuthState;
  setAuth: React.Dispatch<React.SetStateAction<typeof initialAuthState>>;
}

const AuthContext = createContext<AuthContextType>({
  auth: initialAuthState,
  setAuth: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cookies] = useCookies(['userDetails']);
  const currentState = cookies.userDetails
    ? { accessToken: '', ...getDecryptedData(cookies.userDetails) }
    : initialAuthState;
  const [auth, setAuth] = useState(currentState);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
