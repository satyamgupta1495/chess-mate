import Page404 from '@/components/Page404';
import Profile from '@/components/Profile';
import useChessStore from '@/store/useChessStore';
import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../components/Home'));
const ChessMate = lazy(() => import('../components/Chessmate/ChessMate'));
const Login = lazy(() => import('@/components/Login/Login'));
const SignUp = lazy(() => import('@/components/Login/SignUp'));

const AppRoutes = () => {

    const user = useChessStore((state) => state)

    const routes: RouteObject[] = [
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/play',
            element: <ChessMate />,
        },
        {
            path: '/login',
            element: !user?.isUserLoggedOut ? <Navigate to="/" /> : <Login />,
        },
        {
            path: '/signup',
            element: !user?.isUserLoggedOut ? <Navigate to="/" /> : <SignUp />,
        },
        {
            path: '/profile',
            element: <Profile />,
        },
        {
            path: '*',
            element: <Page404 />,
        },
    ];
    return routes;
};

export default AppRoutes;
