import { EAccountStatus, ESpecialAccountRoles } from "../enums";
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

    public async reBlock(id: string, user: IUser): Promise<void> {
        try {
            await User.findByIdAndUpdate(id, {account_status: user.account_status === EAccountStatus.ACTIVE ? EAccountStatus.BLOCKED : EAccountStatus.ACTIVE});
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    // public async reChange(role: ESpecialAccountRoles, id: string) {
    //     try {
    //
    //     } catch (e) {
    //
    //     }
    // }

}

export const userService = new UserService();