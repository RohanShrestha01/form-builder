import { Route, Routes } from 'react-router-dom';
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

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="sso/login" element={<SSOLogin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="recover-password" element={<RecoverPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
      </Route>

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route element={<BaseLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
