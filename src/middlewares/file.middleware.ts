import { Request, Response, NextFunction } from "express";
import { carPhotoConfig } from "../configs";
import { ApiError } from "../errors";

class FileMiddleware {
    public async isCarPhotoValid(req: Request, res: Response, next: NextFunction) {
        try {
            if (Array.isArray(req.files.car_photo)) {
                throw new ApiError("Photo can be only single file", 400)
            }
           const { mimetype, size } = req.files.car_photo;

           if (!carPhotoConfig.mimetypes.includes(mimetype)) {
               throw new ApiError("Avatar has invalid format", 400);
           }

           if (size > carPhotoConfig.max_size) {
               throw new ApiError("Inappropriate size", 400);
           }

           next();
        } catch (e) {
            next(e);
        }
    }
}

export const fileMiddleware = new FileMiddleware();
