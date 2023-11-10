import { FilterQuery } from "mongoose";
import { IUser } from "../interfaces";
import { User } from "../models";
import { ApiError } from "../errors";

class UserRepository {
    public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
        try {
            return await User.findOne(params);
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const userRepository = new UserRepository();