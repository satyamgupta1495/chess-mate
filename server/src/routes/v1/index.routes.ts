import { Router } from 'express';
import usersRouteHandler from './users.routes';
import statsRouteHandler from './stats.routes';

export default function v1RouteHandler(): Router {
    const v1Router = Router();
    
    v1Router.use('/users', usersRouteHandler());
    v1Router.use('/stats', statsRouteHandler());

    return v1Router;
}
