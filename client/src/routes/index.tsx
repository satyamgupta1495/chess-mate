import React, { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../components/Home'));
const ChessMate = lazy(() => import('../components/Chessmate/ChessMate'));

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
    ];
    return routes;
};

export default AppRoutes;
