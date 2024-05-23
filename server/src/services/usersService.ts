import { Service } from "typedi";
import { Users } from "../models/Users";
import { ServiceResponse } from "../types/shared";

@Service()
export default class UsersService {

    constructor() { }

    public async generateToken(id: string) {
        const res: any = {
            errorMessage: '',
            internalError: false,
            response: {},
            success: false,
            error: undefined,
        };
        try {
            if (!id) {
                console.log("Id is required to generate access token")
                return
            }

            const user: any = await Users.findById(id);
            const accessToken = await user.generateAccessToken()
            const refreshToken = await user.generateRefreshToken()

            user.refreshToken = refreshToken

            // const updated: any = Users.findOneAndUpdate(
            //     { _id: id },
            //     {
            //         $set: {
            //             refreshToken: refreshToken
            //         }
            //     }
            // )
            await user.save({ validateBeforeSave: false });

            return { accessToken, refreshToken }

        } catch (error) {
            res.internalError = true;
            res.errorMessage = "Something went wrong while generating access token🥺";
            res.error = error;
            return res;
        }
    }

    public async createUser(data: any) {
        const res: ServiceResponse<any> = {
            errorMessage: '',
            internalError: false,
            response: { result: null, count: undefined },
            success: false,
            error: undefined,
        }

        try {
            const userExist: any = await Users.findOne({
                $or: [{ userName: data?.userName }, { email: data?.email }]
            })

            if (userExist) {
                res.errorMessage = 'User already exists with this email or username.';
                res.error = "user_exists"
                return res;
            }

            const user = await Users.create(data)
            if (!user) {
                res.errorMessage = 'User cannot be created';
                return res;
            }
            res.success = true;
            res.response.result = user;
            return res;
        } catch (error) {
            res.errorMessage = error.message;
            res.internalError = true;
            res.error = error;
            res.success = false;
            return res;
        }
    }

    public async getAllUser() {
        const res: ServiceResponse<any> = {
            errorMessage: '',
            internalError: false,
            response: { result: null, count: undefined },
            success: false,
            error: undefined,
        }

        try {
            const users = await Users.find({})
            if (!users) {
                res.errorMessage = 'User list not found!';
                return res;
            }
            res.success = true;
            res.response.result = users;
            return res;
        } catch (error) {
            res.errorMessage = error.message;
            res.internalError = true;
            res.error = error;
            res.success = false;
            return res;
        }
    }

    public async getUserDetail(id: string) {
        const res: ServiceResponse<any> = {
            errorMessage: '',
            internalError: false,
            response: { result: null, count: undefined },
            success: false,
            error: undefined,
        }

        try {
            const users = await Users.find({ _id: id })
            if (!users) {
                res.errorMessage = 'User not found!';
                return res;
            }
            res.success = true;
            res.response.result = users;
            return res;
        } catch (error) {
            res.errorMessage = error.message;
            res.internalError = true;
            res.error = error;
            res.success = false;
            return res;
        }
    }

    public async login(data: any) {
        const res: any = {
            errorMessage: '',
            internalError: false,
            response: {},
            success: false,
            error: undefined,
        };

        try {
            const user: any = await Users.findOne({ email: data.email });

            if (!user._id) {
                res.errorMessage = 'Unable to fetch user details';
                return res;
            }

            const isValidPassword = await user.isValidPassword(data.password);

            if (!isValidPassword) {
                res.errorMessage = 'incorrect_password';
                return res;
            }

            const { accessToken, refreshToken } = await this.generateToken(user._id);


            const loggedInUser = await Users.findById(user._id).select("-password -refreshToken");

            res.success = true;
            res.response = { loggedInUser, accessToken, refreshToken };
            return res;
        } catch (error) {
            res.internalError = true;
            res.errorMessage = error;
            res.error = error;
            return res;
        }
    }

    public async logout(id: any) {
        const res: any = {
            errorMessage: '',
            internalError: false,
            response: {},
            success: false,
            error: undefined,
        };

        try {
            const user = await Users.findByIdAndUpdate(
                id,
                {
                    $set: {
                        refreshToken: undefined
                    }
                },
                {
                    new: true
                }
            )

            res.success = true;
            res.response = { user };
            return res;
        } catch (error) {
            res.internalError = true;
            res.errorMessage = error;
            res.error = error;
            return res;
        }
    }

    public async refreshAccessToken(incomingRefreshToken: string, decodedToken: string | any) {
        const res: any = {
            errorMessage: '',
            internalError: false,
            response: {},
            success: false,
            error: undefined,
        };

        try {
            const user: any = await Users.findById(decodedToken?._id);
            
            if (!user) {
                res.errorMessage = "invalid_refresh_token";
                return res;
            }

            if (!(user?.refreshToken === incomingRefreshToken)) {
                res.errorMessage = "refresh_token_expired";
                return res;
            }

            const { accessToken, refreshToken } = await this.generateToken(user._id);

            res.success = true;
            res.response = { accessToken, refreshToken };
            return res;

        } catch (error) {
            res.internalError = true;
            res.errorMessage = error;
            res.error = error;
            return res;
        }
    }
}