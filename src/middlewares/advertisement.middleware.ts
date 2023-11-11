import { Response, Request ,NextFunction } from "express";

import { Advertisement } from "../models";
import { ApiError } from "../errors";
import { tokenService } from "../services";
import { EAccountTypes } from "../enums";

class AdvertisementMiddleware {
    public async isAdvertisementExists(req: Request, res: Response, next: NextFunction): Promise<void> {
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
}

export const advertisementMiddleware = new AdvertisementMiddleware();
