import { Request, Response, NextFunction } from "express";

import { Report } from "../models"
import { ApiError } from "../errors";
import { userRepository } from "../repositories";
import { User } from "../models";
import { tokenService } from "../services";
import { EAccountStatus } from "../enums";

class UserMiddleware {
    public async isEmailUniq(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;
            const user = await userRepository.getOneByParams({email});
            if (user) {
                throw new ApiError("User already exists", 409);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
    public async isUserExists(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                throw new ApiError("No such a user", 401);
            }

            req.res.locals.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async isUserBlocked(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const accessToken = req.get("Authorization");
            const { account_status } = tokenService.checkToken(accessToken, "access");

            if (account_status === EAccountStatus.BLOCKED) {
                throw new ApiError("Account blocked", 403);
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public isAllowToManageUser(param: string, allowedToManage: string[]) {
        return (req: Request, res: Response, next: NextFunction): void => {
            try {
                const parameter = req.params[param];

                const accessToken = req.get("Authorization");
                const tokenPayload = tokenService.checkToken(accessToken, "access");

                if (!allowedToManage.includes(tokenPayload.account_role)) {
                    if (parameter !== tokenPayload._userId.toString()) {
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

export const userMiddleware = new UserMiddleware();
