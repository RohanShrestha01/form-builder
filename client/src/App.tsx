import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AuthLayout from './layouts/AuthLayout';

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}
