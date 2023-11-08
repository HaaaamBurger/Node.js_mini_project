import { Request, Response, NextFunction } from "express";

import { ObjectSchema } from "joi";
import { ApiError } from "../errors";
import { EAccountStatus, EGuerySort } from "../enums";
import { IUserQuery } from "../interfaces";

class GeneralMiddleware {
    public isAccountStatus(status: EAccountStatus) {
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

    public isQueryValid(limit: number, sortedBy: EGuerySort) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const query = req.query;
                console.log(query);
            } catch (e) {
                next(e);
            }
        }
    }
}

export const generalMiddleware = new GeneralMiddleware();