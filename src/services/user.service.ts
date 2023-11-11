import { Types } from "mongoose";

import { EAccountStatus, EAccountTypes, ESpecialAccountRoles } from "../enums";
import { ApiError } from "../errors";
import { IUser } from "../interfaces";
import { User } from "../models";

class UserService {
    public async getAllUsers(): Promise<IUser[]> {
        try {
            return await User.find().populate("");
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

    public async changeRole(id: string, role: ESpecialAccountRoles): Promise<void> {
        try {
            await User.findByIdAndUpdate(id, { account_role: role });
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async changeType(id: string, type: EAccountTypes) {
        try {
            await User.findByIdAndUpdate(id, { account_type: type })
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

}

export const userService = new UserService();