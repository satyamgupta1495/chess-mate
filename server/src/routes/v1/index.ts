import { Router } from 'express';
import gameRouteHandler from './game';

export default function v1RouteHandler(): Router {
    const v1Router = Router();
    v1Router.use('/game', gameRouteHandler());
    return v1Router;
}
