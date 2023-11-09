import { FilterQuery } from "mongoose";
import { IUser } from "../interfaces";
import { User } from "../models";

class UserRepository {
    public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
        return await User.findOne(params);
    }
}

export const userRepository = new UserRepository();