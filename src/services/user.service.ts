import { ApiError } from "../errors";
import {IAdvertisement, ITokenPayload, IUser } from "../interfaces";
import {Advertisement, User } from "../models";

class UserService {
    public async getAll(): Promise<IUser[]> {
        try {
            return await User.find();
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async createAdvertisement(advertisement: IAdvertisement, tokenPayload: ITokenPayload): Promise<void> {
        try {
            await Advertisement.create({...advertisement, owner: tokenPayload._userId});
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async getAdvertisementById(id: string): Promise<IAdvertisement> {
        try {
            return await Advertisement.findById(id).populate("owner")
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async deleteAdvertisementById(id: string): Promise<void> {
        try {
            await Advertisement.findByIdAndDelete(id);
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async updateAdvertisementById(body: Partial<IUser>, id: string) {
        try {
            return await Advertisement.findByIdAndUpdate(id, body, {
                returnDocument: "after"
            })
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const userService = new UserService();