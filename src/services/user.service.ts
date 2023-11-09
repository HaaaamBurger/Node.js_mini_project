import { ApiError } from "../errors";
import { IUser } from "../interfaces";
import { User } from "../models";

class UserService {
    public async getAllUsers(): Promise<IUser[]> {
        try {
            return await User.find();
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    };

    public async getUserById(id: string): Promise<IUser> {
        try {
            return await User.findById(id);
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    };

    public async deleteUserById(id: string): Promise<void> {
        try {
            await User.findByIdAndDelete(id);
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    };

    public async updateUserById(body: Partial<IUser>, id: string): Promise<IUser> {
        try {
            return await User.findByIdAndUpdate(id, body, {
                returnDocument: "after"
            })
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    };

}

export const userService = new UserService();