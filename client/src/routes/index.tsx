import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../components/Home'));
const ChessMate = lazy(() => import('../components/Chessmate/ChessMate'));
const Login = lazy(() => import('@/components/Login/Login'));
const SignUp = lazy(() => import('@/components/Login/SignUp'));

const AppRoutes = () => {
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
            element: <Login />,
        },
        {
            path: '/signup',
            element: <SignUp />,
        },
    ];
    return routes;
};

export default AppRoutes;
