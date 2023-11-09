import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors";
import { userRepository } from "../repositories";
import { User } from "../models";

class UserMiddleware {
    public async isEmailUniq(req: Request, res: Response, next: NextFunction) {
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
    public async isUserExists(req: Request, res: Response, next: NextFunction) {
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

}

export const userMiddleware = new UserMiddleware();