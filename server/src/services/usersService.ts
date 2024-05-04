import { Service } from "typedi";
import { Users } from "../models/Users";
import { ServiceResponse } from "../types/shared";

@Service()
export default class UsersService {

    constructor() { }

    public async createUser(data) {
        const res: ServiceResponse<any> = {
            errorMessage: '',
            internalError: false,
            response: { result: null, count: undefined },
            success: false,
            error: undefined,
        }

        try {
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
}