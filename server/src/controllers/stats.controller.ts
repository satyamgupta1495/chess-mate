import { Service } from "typedi";
import StatsService from "../services/statsService";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from 'express';

@Service()
class StatsController {
    constructor(private readonly statsService: StatsService) {
        this.statsService = statsService
    }

    createPlayStats = async (req: Request | any, res: Response) => {
        const response: any = {
            success: false,
            errorMsg: '',
            successMsg: '',
            response: {},
        };

        try {

            const { body } = req.body

            const serviceResponse = await this.statsService.createPlayerStats(body)

            if (!serviceResponse.success) {
                response.response = serviceResponse.response;
                response.errorMsg = serviceResponse.errorMessage;
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
                return;
            }

            response.success = true;
            response.successMsg = 'User stats cannot be created 👍';
            response.response = serviceResponse.response;
            res.status(StatusCodes.OK).json(response);
            return;
        } catch (error) {
            console.log(error)
        }
    }

    getPlayerStats = async (req: Request | any, res: Response) => {
        const response: any = {
            success: false,
            errorMsg: '',
            successMsg: '',
            response: {},
        };

        try {
            const { id } = req.params

            const serviceResponse = await this.statsService.getPlayerStats(id)

            if (!serviceResponse.success) {
                response.response = serviceResponse.response;
                response.errorMsg = serviceResponse.errorMessage;
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
                return;
            }

            response.success = true;
            response.successMsg = 'User stats fetched successfully 👍';
            response.response = serviceResponse.response;
            res.status(StatusCodes.OK).json(response);
            return;
        } catch (error) {
            console.log(error)
        }
    }

    updatePlayerStats = async (req: Request | any, res: Response) => {
        const response: any = {
            success: false,
            errorMsg: '',
            successMsg: '',
            response: {},
        };

        try {
            const { id } = req.params
            const { body } = req.body

            const serviceResponse = await this.statsService.updateStats(id, body)

            if (!serviceResponse.success) {
                response.response = serviceResponse.response;
                response.errorMsg = serviceResponse.errorMessage;
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
                return;
            }

            response.success = true;
            response.successMsg = 'User stats updated successfully 👍';
            response.response = serviceResponse.response;
            res.status(StatusCodes.OK).json(response);
            return;
        } catch (error) {
            console.log(error)
        }
    }
}

export default StatsController;