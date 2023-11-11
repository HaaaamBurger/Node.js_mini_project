import { Request, Response, NextFunction } from "express";

import { ApiError } from "../errors";
import { tokenService } from "../services";

class AuthMiddleware {
    public async checkAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const accessToken = req.get("Authorization");

            if (!accessToken) {
                throw new ApiError("Unauthorized", 401);
            }

            const tokenPayload = tokenService.checkToken(accessToken, "access");

            req.res.locals.tokenPayload = tokenPayload;
            req.res.locals.accessToken = accessToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const refreshToken = req.get("Authorization");

            if (!refreshToken) {
                throw new ApiError("Unauthorized", 401);
            }

            const tokenPayload = tokenService.checkToken(refreshToken, "refresh");

            req.res.locals.tokenPayload = tokenPayload;
            req.res.locals.refreshToken = refreshToken;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();