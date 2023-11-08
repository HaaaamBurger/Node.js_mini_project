import { Request, Response, NextFunction } from "express";
import { EAccountStatus } from "../../enums";
import { ObjectSchema } from "joi";
import { ApiError } from "../../errors";

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
}

export const generalMiddleware = new GeneralMiddleware();