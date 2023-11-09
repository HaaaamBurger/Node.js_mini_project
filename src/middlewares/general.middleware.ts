import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { ApiError } from "../errors";
import { EAccountTypes } from "../enums";
import mongoose from "mongoose";

class GeneralMiddleware {
    public isAccountStatus(status: EAccountTypes) {
        return (req: Request, res: Response, next: NextFunction) => {

        }
    }

    public isBodyValid(validator: ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction): void => {
            try {
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
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params[field];

                if (!mongoose.isObjectIdOrHexString(id)) {
                    throw new ApiError("Not valid ID", 400);
                }

                next();
            } catch (e) {
                next(e);
            }
        }
    }

}

export const generalMiddleware = new GeneralMiddleware();