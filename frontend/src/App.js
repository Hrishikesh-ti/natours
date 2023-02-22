import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AccountPage, {
  loader as userDataLoader,
  action as updateAction,
} from './pages/Account';
import ErrorPage from './pages/Error';
import HomePage, { loader as toursLoader } from './pages/Home';
import LoginPage, { action as loginAction } from './pages/Login';
import { loader as logoutLoader } from './pages/Logout';
import SignupPage, { action as signupAction } from './pages/Signup';
import TourDetailPage, { loader as tourLoader } from './pages/TourDetail';
import Layout, { loader as cookieLoader } from './ui/Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: cookieLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: toursLoader,
      },
      {
        path: ':tourId',
        element: <TourDetailPage />,
        loader: tourLoader,
      },
      { path: 'login', element: <LoginPage />, action: loginAction },
      { path: 'signup', element: <SignupPage />, action: signupAction },
      { path: 'logout', loader: logoutLoader },
      {
        path: 'me',
        element: <AccountPage />,
        loader: userDataLoader,
        action: updateAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
