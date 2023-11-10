import { Response, Request ,NextFunction } from "express";
import { Advertisement } from "../models";
import { ApiError } from "../errors";

class AdvertisementMiddleware {
    public async isAdvertisementExists(req: Request, res: Response, next: NextFunction) {
        try {
            const { adId } = req.params;
            const advertisement = await Advertisement.findById(adId);

            if (!advertisement) {
                throw new ApiError("No such an advertisement",401);
            }

            req.res.locals.advertisement = advertisement;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const advertisementMiddleware = new AdvertisementMiddleware();