import { FilterQuery } from "mongoose";

import { ApiError } from "../errors";
import { IUser } from "../interfaces";
import { User } from "../models";

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
