import Container from "typedi";
import { Router } from "express";
import StatsController from "../../controllers/stats.controller";
import Authorization from "../../middlewares/auth.middleware";

export default function statsRouteHandler(): Router {
    const statsRouter = Router()
    const statsController = Container.get(StatsController)

    const auth = new Authorization()

    //Private routes
    statsRouter.post('/', statsController.createPlayStats)
    statsRouter.get('/:id', statsController.getPlayerStats)
    statsRouter.put('/:id', statsController.updatePlayerStats)

    return statsRouter;
}