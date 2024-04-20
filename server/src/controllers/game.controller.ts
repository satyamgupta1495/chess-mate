import { Service } from "typedi";
import { StatusCodes } from 'http-status-codes';
import { IResponse } from "../types/shared";
import { Request, Response } from "express";
import { GameService } from "../services/game.service";

@Service()
class GameController {
    constructor() { }

    public startGame = async (req: Request, res: Response) => {
        try {
            const response: IResponse<any> = {
                success: false,
                errorMsg: '',
                successMsg: '',
            };

            response.success = true;
            response.successMsg = 'OK 👍';
            res.status(StatusCodes.OK).json(response);
            return
        } catch (error) {
            console.log(error)
        }
    }
}

export default GameController