import { lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const PATH_AFTER_LOGIN = '/dashboard/app';
  console.log('PATH_AFTER_LOGIN', PATH_AFTER_LOGIN);
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyEmail /> },
        { path: 'verify/:email', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'albums', element: <Album /> },
      ],
    },
    {
      path: '/',
      element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    },
    // Main Routes
    // {
    //   path: '*',
    //   element: <LogoOnlyLayout />,
    //   children: [
    //     { path: 'coming-soon', element: <ComingSoon /> },
    //     { path: 'maintenance', element: <Maintenance /> },
    //     { path: 'pricing', element: <Pricing /> },
    //     { path: 'payment', element: <Payment /> },
    //     { path: '500', element: <Page500 /> },
    { path: '404', element: <NotFound /> },
    //     { path: '*', element: <Navigate to='/404' replace /> },
    //   ],
    // },

    { path: '*', element: <Navigate to='/404' replace /> },
  ]);
}

const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(
  lazy(() => import('../pages/auth/ResetPassword'))
);
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
const VerifyEmail = Loadable(lazy(() => import('../pages/auth/VerifyEmail')));
const GeneralApp = Loadable(
  lazy(() => import('../pages/dashboard/GeneralApp'))
);
const NotFound = Loadable(lazy(() => import('../pages/logoOnly/NotFound')));
const DashboardLayout = Loadable(lazy(() => import('../layouts/dashboard')));
const AuthGuard = Loadable(lazy(() => import('../gaurds/AuthGuard')));
const GuestGuard = Loadable(lazy(() => import('../gaurds/GuestGuard')));
const Album = Loadable(lazy(() => import('../pages/dashboard/Album')));
