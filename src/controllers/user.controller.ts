import { Request, Response, NextFunction } from "express";
import { userService } from "../services";
import {IAdvertisement, IUser } from "../interfaces";

class UserController {
    public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response<IUser[]>> {
        try {
            const users = await userService.getAll();

            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
    public async createAdvertisement(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const tokenPayload = req.res.locals.tokenPayload;
            const advertisement = req.body;

            await userService.createAdvertisement(advertisement, tokenPayload);

            res.status(201).json("Advertisement created");
        } catch (e) {
            next(e);
        }
    }

    public async getAdvertisementById(req: Request, res: Response, next: NextFunction): Promise<Response<IAdvertisement>> {
        try {
            const { adId } = req.params;

            const advertisement = await userService.getAdvertisementById(adId);

            return res.status(200).json(advertisement);
        } catch (e) {
            next(e);
        }
    }

    public async deleteAdvertisementById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { adId } = req.params;

            await userService.deleteAdvertisementById(adId);

            res.status(200).json("Advertisement deleted successfully");
        } catch (e) {
            next(e);
        }
    }

    public async updateAdvertisementById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const body = req.body;
            const { adId } = req.params;

            const user = await userService.updateAdvertisementById(body, adId);

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();