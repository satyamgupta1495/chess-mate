import { Router } from 'express';
import gameRouteHandler from './game';
import usersRouteHandler from './users';

export default function v1RouteHandler(): Router {
    const v1Router = Router();
    v1Router.use('/game', gameRouteHandler());
    v1Router.use('/users', usersRouteHandler());
    return v1Router;
}
