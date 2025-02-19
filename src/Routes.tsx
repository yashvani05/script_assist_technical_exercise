import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Landing from './pages/landing/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';
import PrivateRoute from './components/PrivateRoute';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> }, // Added signup route
      {
        element: <PrivateRoute />,
        children: [
          { path: '/resources', element: <ResourceList /> },
          { path: '/resources/:id', element: <ResourceDetail /> },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
