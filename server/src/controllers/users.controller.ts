import { Service } from "typedi";
import UsersService from "../services/usersService";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from 'express';
import { uploadToCloudinary } from "../utils/cloudinaryService";
import jwt from "jsonwebtoken";
import { cookieOption } from "../constants";

@Service()
class UsersController {
    constructor(private readonly usersService: UsersService) {
        this.usersService = usersService
    }

    createUser = async (req: any, res: Response, next: NextFunction) => {
        const response: any = {
            success: false,
            errorMsg: '',
            successMsg: '',
            response: {},
        };
        try {
            console.log(req.body)
            const data: any = {
                email: req.body?.email,
                userName: req.body?.username,
                password: req.body?.password
            } as { [key: string]: string };

            const avatarImage = req.files?.avatar?.[0]?.path
            const coverImage = req.files?.coverImage?.[0]?.path

            if (!avatarImage) {
                response.errorMsg = "Profile image is required!"
                res.status(StatusCodes.CONFLICT).json(response);
                return;
            }

            const avatar = await uploadToCloudinary(avatarImage);
            const coverImg = await uploadToCloudinary(coverImage);

            if (!avatar) {
                response.errorMsg = "Profile image is required!"
                res.status(StatusCodes.CONFLICT).json(response);
                return;
            }

            const serviceResponse = await this.usersService.createUser({ ...data, avatar: avatar.url, coverImg: coverImg?.url || "" });

            if (!serviceResponse.success && serviceResponse.error === "user_exists") {
                response.response = serviceResponse.response;
                response.error = "user_exists";
                response.errorMsg = serviceResponse.errorMessage;
                res.status(StatusCodes.CONFLICT).json(response);
                return;
            }

            if (!serviceResponse.success) {
                response.response = serviceResponse.response;
                response.errorMsg = serviceResponse.errorMessage;
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
                response.errorMsg = serviceResponse.errorMessage;
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
                response.errorMsg = serviceResponse.errorMessage;
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

    loginUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response: any = {
                success: false,
                errorMsg: '',
                successMsg: '',
                response: {},
            };
            const { email, password } = req.body

            if (!(email || password)) {
                response.errorMessage = "email and password are required";
                res.status(StatusCodes.BAD_REQUEST).json(response);
                return;
            }

            const serviceResponse = await this.usersService.login({ email, password })

            if (serviceResponse.errorMessage === 'incorrect_password') {
                response.response = serviceResponse.response;
                res.status(StatusCodes.UNAUTHORIZED).json(response);
                return;
            }

            if (!serviceResponse.success) {
                response.response = serviceResponse.response;
                response.errorMsg = serviceResponse.errorMessage;
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
                return;
            }

            response.success = true;
            response.successMsg = 'User logged in successfully 👍';
            response.response = serviceResponse.response;

            res.status(StatusCodes.OK)
                .cookie("accessToken", serviceResponse.response.accessToken, cookieOption)
                .cookie("refreshToken", serviceResponse.response.refreshToken, cookieOption)
                .json(response);

            return res;

        } catch (error) {
            console.log(error)
        }
    }

    logoutUser = async (req: Request | any, res: Response, _) => {
        const response: any = {
            success: false,
            errorMsg: '',
            successMsg: '',
            response: {},
        };
        try {
            const id = req.user._id

            const serviceResponse = await this.usersService.logout(id)

            if (!serviceResponse?.response?.user) {
                response.errorMsg = serviceResponse.errorMessage;
                return response;
            }

            response.success = true;
            response.successMsg = 'User logged out successfully 👍';
            response.response = serviceResponse.response;

            res.status(StatusCodes.OK)
                .clearCookie("accessToken", cookieOption)
                .clearCookie("refreshToken", cookieOption)
                .json(response);
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    refreshAccessToken = async (req: Request | any, res: Response, _) => {
        const response: any = {
            success: false,
            errorMsg: '',
            successMsg: '',
            response: {},
        };

        try {
            const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

            if (!incomingRefreshToken) {
                response.errorMsg = "Unauthorized error"
                return response
            }

            const decodedToken: any = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

            const serviceResponse = await this.usersService.refreshAccessToken(incomingRefreshToken, decodedToken)

            if (!serviceResponse.success) {
                response.errorMsg = serviceResponse.errorMessage;
                return response;
            }

            response.success = true;
            response.successMsg = 'Token refreshed successfully 👍';
            response.response = serviceResponse.response;

            res.status(StatusCodes.OK)
                .cookie("accessToken", serviceResponse.response.accessToken, cookieOption)
                .cookie("refreshToken", serviceResponse.response.refreshToken, cookieOption)
                .json(response);

            return res;

        } catch (error) {
            console.log(error)
        }
    }

}

export default UsersController;