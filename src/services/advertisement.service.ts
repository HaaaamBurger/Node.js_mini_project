import { ApiError } from "../errors";
import { IAdvertisement, ITokenPayload, IUser } from "../interfaces";
import { Advertisement } from "../models";
import { advertisementRepository } from "../repositories";

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
            const convertedCurrencies = await advertisementRepository.convertCurrency({base_ccy: advertisement.currency, price: advertisement.price});

            await Advertisement.create({...advertisement, price: convertedCurrencies, owner: tokenPayload._userId});
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

    public async updateAdvertisementById(advertisement: IAdvertisement, body: Partial<IAdvertisement>, id: string): Promise<IAdvertisement> {
        try {
            if (body.price || body.currency) {
                if (!body.price || !body.currency) {
                    throw new ApiError("Price and Currency required", 400);
                }
                const convertedCurrencies = await advertisementRepository.convertCurrency({base_ccy: body.currency, price: body.price});
                body = {...body, price: convertedCurrencies};
            }

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