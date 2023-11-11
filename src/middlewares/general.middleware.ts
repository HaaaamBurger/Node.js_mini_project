import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import mongoose from "mongoose";

import { ApiError } from "../errors";
import { tokenService } from "../services";

class GeneralMiddleware {
    public isBodyValid(validator: ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction): void => {
            try {

                if (!Object.values(req.body).length) {
                    throw new ApiError("No body", 400);
                }

                const { value, error } = validator.validate(req.body);

                if (error) {
                    throw new ApiError(error.message, 400);
                }

                req.body = value;
                next();
            } catch (e) {
                next(e);
            }
        }
    }

    public isIdValid(field: string) {
        return (req: Request, res: Response, next: NextFunction): void => {
            try {
                const id = req.params[field];

                if (!mongoose.isObjectIdOrHexString(id)) {
                    throw new ApiError("ID not valid", 400);
                }

                next();
            } catch (e) {
                next(e);
            }
        }
    }

    public isAllowToManage(param: string, allowedToManage: string[]) {
        return (req: Request, res: Response, next: NextFunction): void => {
            try {
                const { param } = req.params;
                const accessToken = req.get("Authorization");
                const tokenPayload = tokenService.checkToken(accessToken, "access");

                if (!allowedToManage.includes(tokenPayload.account_role)) {
                    if (param !== tokenPayload._userId.toString()) {
                        throw new ApiError("You cannot manage this account", 400);
                    }
                }

                next();
            } catch (e) {
                next(e);
            }
        }
    }

}

export const generalMiddleware = new GeneralMiddleware();
