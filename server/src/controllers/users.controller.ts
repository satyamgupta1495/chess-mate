import { Container, Service } from "typedi";
import UsersService from "../services/usersService";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from 'express';

@Service()
class UsersController {
    constructor(private readonly usersService: UsersService) {
        this.usersService = usersService
    }

    createUser = async (req: any, res: Response, next: NextFunction) => {
        try {
            const response: any = {
                success: false,
                errorMsg: '',
                successMsg: '',
                response: {},
            };

            const data: any = {
                email: req.body?.email,
                userName: req.body?.username,
                password: req.body?.password
            } as { [key: string]: string };

            const serviceResponse = await this.usersService.createUser(data);

            if (!serviceResponse.success) {
                response.response = serviceResponse.response;
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
                return;
            }

            response.success = true;
            response.successMsg = 'User created successfully 👍';
            response.response = serviceResponse.response;
            res.status(StatusCodes.OK).json(response);
            return;
        } catch (error) {
            console.log(error)
        }

    }

    getAllUser = async (req: any, res: Response, next: NextFunction) => {
        try {
            const response: any = {
                success: false,
                errorMsg: '',
                successMsg: '',
                response: {},
            };

            const serviceResponse = await this.usersService.getAllUser();

            if (!serviceResponse.success) {
                response.response = serviceResponse.response;
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
                return;
            }

            response.success = true;
            response.successMsg = 'User list fetched successfully 👍';
            response.response = serviceResponse.response;
            res.status(StatusCodes.OK).json(response);
            return;
        } catch (error) {
            console.log(error)
        }

    }

    getUserDetail = async (req: any, res: Response, next: NextFunction) => {
        try {
            const response: any = {
                success: false,
                errorMsg: '',
                successMsg: '',
                response: {},
            };
            const { id } = req.params;
            const serviceResponse = await this.usersService.getUserDetail(id);

            if (!serviceResponse.success) {
                response.response = serviceResponse.response;
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
                return;
            }

            response.success = true;
            response.successMsg = 'User details fetched successfully 👍';
            response.response = serviceResponse.response;
            res.status(StatusCodes.OK).json(response);
            return;
        } catch (error) {
            console.log(error)
        }

    }


}

export default UsersController