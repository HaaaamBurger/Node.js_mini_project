import { ApiError } from "../errors";
import { IAdvertisement, IPrices, IStatistic, ITokenPayload } from "../interfaces";
import { Advertisement, Statistic } from "../models";
import { advertisementRepository } from "../repositories";
import { statisticsService } from "./statistics.service";

class AdvertisementService {
    public async getAllAdvertisements(): Promise<IAdvertisement[]> {
        try {
            return await Advertisement.find().select("_id producer car_model city year price currency");
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async getAdvertisementById(id: string): Promise<IAdvertisement> {
        try {
            await advertisementRepository.viewsIncrement(id);
            return await Advertisement.findById(id).populate("owner", "_id email phone_number");
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    };

    public async createAdvertisement(advertisement: IAdvertisement, tokenPayload: ITokenPayload): Promise<void> {
        try {
            const convertedCurrencies = await advertisementRepository.convertCurrency(
                {
                    base_ccy: advertisement.currency,
                    price: advertisement.price
                }) as IPrices;
            const createdAdvertisement = await Advertisement.create(
                {...advertisement,
                    price: convertedCurrencies,
                    owner: tokenPayload._userId
                });
            await statisticsService.createAdStatistic(
                advertisement.city,
                createdAdvertisement._id.toHexString()
            );
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
            return await Advertisement.find({ owner: id }).select("_id producer car_model year price currency");
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async advertisementStats(): Promise<IStatistic[]> {
        try {
            return await Statistic.find().populate("advertisement");
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const advertisementService = new AdvertisementService();
