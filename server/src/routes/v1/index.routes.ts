import { Router } from 'express';
import usersRouteHandler from './users.routes';

export default function v1RouteHandler(): Router {
    const v1Router = Router();
    v1Router.use('/users', usersRouteHandler());
    return v1Router;
}
