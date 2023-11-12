import { Response, Request ,NextFunction } from "express";
import { Types } from "mongoose";

import { Advertisement, Statistic } from "../models";
import { ApiError } from "../errors";
import { tokenService } from "../services";
import { EAccountTypes } from "../enums";
import { IAdvertisement } from "../interfaces";

class AdvertisementMiddleware {
    public async isAdvertisementExists(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { adId } = req.params;
            const advertisement = await Advertisement.findById(adId).populate("owner", "_id email phone_number");

            if (!advertisement) {
                throw new ApiError("No such an advertisement",401);
            }

            req.res.locals.advertisement = advertisement;

            next();
        } catch (e) {
            next(e);
        }
    }

    public isLimitReached(limit = 1) {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
               const accessToken = req.get("Authorization");
               const { account_type, _userId } = tokenService.checkToken(accessToken, "access");

               if (account_type === EAccountTypes.BASIC) {
                   const ads_count = await Advertisement.countDocuments({owner: _userId});
                   if (ads_count >= limit) {
                       throw new ApiError(`Buy ${EAccountTypes.PREMIUM} account to create more ads. For ${EAccountTypes.BASIC} limit is ${limit}`, 403)
                   }
               }
               next();
            } catch (e) {
                next(e);
            }
        }
    }

    public isAccountTypeAllowed(isAllowedToManage: EAccountTypes[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const accessToken = req.get("Authorization");
                const { account_type } = tokenService.checkToken(accessToken, "access");

                if (!isAllowedToManage.includes(account_type)) {
                    throw new ApiError("Permitted", 403);
                }

                next();
            } catch (e) {
                next(e);
            }
        }
    }

    public async isStatisticExists(req: Request, res: Response, next: NextFunction) {
        try {
            const { statId } = req.params;
            const statistic = await Statistic.findById(statId).populate("advertisement");

            if (!statistic) {
                throw new ApiError("No such a statistic", 401);
            }

            req.res.locals.statistic = statistic;

            next();
        } catch (e) {
            next(e);
        }
    }

    public isAllowToManageAdvertisement(param: string, allowedToManage: string[]) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const parameter = req.params[param];

                const accessToken = req.get("Authorization");
                const tokenPayload = tokenService.checkToken(accessToken, "access");

                let { owner } = await Advertisement.findById(parameter) as IAdvertisement;

                console.log(tokenPayload._userId, owner.toHexString())

                if (!allowedToManage.includes(tokenPayload.account_role)) {
                    if (tokenPayload._userId.toString() !== owner.toHexString()) {
                        throw new ApiError("You cannot manage this subject", 400);
                    }
                }

                next();
            } catch (e) {
                next(e);
            }
        }
    }

}

export const advertisementMiddleware = new AdvertisementMiddleware();
