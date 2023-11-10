import { ApiError } from "../errors";
import { IAdvertisement, ITokenPayload, IUser } from "../interfaces";
import { Advertisement } from "../models";

class AdvertisementService {
    public async getAllAdvertisements(): Promise<IAdvertisement[]> {
        try {
            return await Advertisement.find().populate("owner", "_id email phone_number");;
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async getAdvertisementById(id: string): Promise<IAdvertisement> {
        try {
            return await Advertisement.findById(id).populate("owner", "_id email phone_number");
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    };

    public async createAdvertisement(advertisement: IAdvertisement, tokenPayload: ITokenPayload): Promise<void> {
        try {
            await Advertisement.create({...advertisement, owner: tokenPayload._userId});
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    };

    public async deleteAdvertisementById(id: string): Promise<void> {
        try {
            await Advertisement.findByIdAndDelete(id);
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    };

    public async updateAdvertisementById(body: Partial<IAdvertisement>, id: string): Promise<IAdvertisement> {
        try {
            return await Advertisement.findByIdAndUpdate(id, body, {
                returnDocument: "after"
            })
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    };

    public async getUserAdvertisements(id: string): Promise<IAdvertisement[]> {
        try {
            return await Advertisement.find({ owner: id });
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const advertisementService = new AdvertisementService();