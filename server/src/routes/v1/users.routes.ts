import Container from "typedi";
import { Router } from "express";
import UsersController from "../../controllers/users.controller";
import { upload } from "../../middlewares/multer.middleware";
import Authorization from "../../middlewares/auth.middleware";

export default function usersRouteHandler(): Router {
    const usersRouter = Router()
    const usersController = Container.get(UsersController)

    const auth = new Authorization()

    usersRouter.post('/', upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]), usersController.createUser)
    usersRouter.get('/', usersController.getAllUser)
    usersRouter.post('/login', usersController.loginUser)

    //Private routes
    usersRouter.get('/:id', usersController.getUserDetail)
    usersRouter.post('/logout', usersController.logoutUser)
    usersRouter.post('/refresh-token', usersController.refreshAccessToken)

    return usersRouter;
}