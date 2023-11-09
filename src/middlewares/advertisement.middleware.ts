import { Response, Request ,NextFunction } from "express";
import { Advertisement } from "../models";
import { ApiError } from "../errors";

class AdvertisementMiddleware {
    public async isAdvertisementExists(req: Request, res: Response, next: NextFunction) {
        try {
            const { adId } = req.params;
            const user = await Advertisement.findById(adId);
            if (!user) {
                throw new ApiError("No such an advertisement",401);
            }

            req.res.locals.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const advertisementMiddleware = new AdvertisementMiddleware();