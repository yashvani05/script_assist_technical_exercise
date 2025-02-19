import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/app.store';

const PrivateRoute = () => {
  const user = useAuthStore((state) => state.user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
