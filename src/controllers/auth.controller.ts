import { NextFunction, Request, Response } from "express";

import { ITokenPair } from "../interfaces";
import { authService } from "../services";

class AuthController {
  public async registerIn(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await authService.registerIn(req.body);
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async logIn(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokenPair>> {
    try {
      const tokenPair = await authService.logIn(req.body);
      return res.json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async refreshIn(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokenPair>> {
    try {
      const tokenPayload = req.res.locals.tokenPayload;

      const tokenPair = await authService.refreshIn(tokenPayload);

      return res.json(tokenPair);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
