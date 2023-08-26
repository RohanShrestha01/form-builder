import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import AuthLayout from './layouts/AuthLayout';
import Signup from './pages/auth/Signup';
import RecoverPassword from './pages/auth/RecoverPassword';
import SSOLogin from './pages/auth/SSOLogin';
import ResetPassword from './pages/auth/ResetPassword';

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="sso/login" element={<SSOLogin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="recover-password" element={<RecoverPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
}
