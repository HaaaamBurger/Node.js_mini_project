import { Request, Response, NextFunction } from "express";
import { authService } from "../services";
import { ITokenPair } from "../interfaces";

class AuthController {
    public async registerIn(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            await authService.registerIn(req.body);
            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }

    public async logIn(req: Request, res: Response, next: NextFunction): Promise<Response<ITokenPair>> {
        try {
            const tokenPair = await authService.logIn(req.body);
            return res.json(tokenPair);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();