import { Request, Response, NextFunction } from "express";

import { IAdvertisement, IStatistic } from "../interfaces";
import { advertisementService } from "../services";

class AdvertisementController {
    public async getAllAdvertisements(req: Request, res: Response, next: NextFunction): Promise<Response<IAdvertisement[]>> {
        try {
            const advertisements = await advertisementService.getAllAdvertisements();

            return res.json(advertisements);
        } catch (e) {
            next(e)
        }
    };

    public async getAdvertisementById(req: Request, res: Response, next: NextFunction): Promise<Response<IAdvertisement>> {
        try {
            const { adId } = req.params;

            const advertisement = await advertisementService.getAdvertisementById(adId);

            return res.status(200).json(advertisement);
        } catch (e) {
            next(e);
        }
    };

    public async createAdvertisement(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const tokenPayload = req.res.locals.tokenPayload;
            const advertisement = req.body;

            await advertisementService.createAdvertisement(advertisement, tokenPayload);

            res.status(201).json("Advertisement created");
        } catch (e) {
            next(e);
        }
    };

    public async deleteAdvertisementById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { adId } = req.params;

            await advertisementService.deleteAdvertisementById(adId);

            res.status(200).json("Advertisement successfully deleted");
        } catch (e) {
            next(e);
        }
    };

    public async updateAdvertisementById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const body = req.body;
            const { adId } = req.params;

            const createdAdvertisement = await advertisementService.updateAdvertisementById(body, adId);

            res.status(201).json(createdAdvertisement);
        } catch (e) {
            next(e);
        }
    };

    public async getUserAdvertisements(req: Request, res: Response, next: NextFunction): Promise<Response<IAdvertisement[]>> {
        try {
            const { id } = req.params;

            const advertisements = await advertisementService.getUserAdvertisements(id);

            return res.json(advertisements);
        } catch (e) {
            next(e);
        }
    }

    public async advertisementStats(req: Request, res: Response, next: NextFunction): Promise<Response<IStatistic[]>> {
        try {
            const advertisements = await advertisementService.advertisementStats();
            return res.json(advertisements);
        } catch (e) {
            next(e);
        }
    }
}

export const advertisementController = new AdvertisementController();