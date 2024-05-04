import Container from "typedi";
import { Router } from "express";
import UsersController from "../../controllers/users.controller";

export default function usersRouteHandler(): Router {
    const usersRouter = Router()

    const usersController = Container.get(UsersController)

    usersRouter.post('/', usersController.createUser)
    usersRouter.get('/', usersController.getAllUser)
    usersRouter.get('/:id', usersController.getUserDetail)

    return usersRouter;
}