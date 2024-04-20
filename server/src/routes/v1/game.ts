import Container from "typedi";
import { Router } from "express";
import GameController from "../../controllers/game.controller";

export default function gameRouteHandler(): Router {
    const gameRouter = Router()

    const gameController = Container.get(GameController)

    gameRouter.get('/', gameController.startGame)

    return gameRouter;
}