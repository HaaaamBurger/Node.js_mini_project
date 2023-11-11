import { Request, Response, NextFunction } from "express";

import { userService } from "../services";
import { IUser } from "../interfaces";

class UserController {
    public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response<IUser[]>> {
        try {
            const users = await userService.getAllUsers();

            return res.json(users);
        } catch (e) {
            next(e);
        }
    };

    public async getUserById(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {
            const { id } = req.params;

            const user = await userService.getUserById(id);

            return res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    };

    public async deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            await userService.deleteUserById(id);

            res.status(200).json("User successfully deleted");
        } catch (e) {
            next(e);
        }
    };

    public async updateUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const body = req.body;
            const { id } = req.params;

            const advertisement = await userService.updateUserById(body, id);

            res.status(201).json(advertisement);
        } catch (e) {
            next(e);
        }
    };

    public async reBlock(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const user =  req.res.locals.user;

            await userService.reBlock(id, user);

            res.status(200).json("Account status has changed");
        } catch (e) {
            next(e);
        }
    }

    public async changeRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { special_role } = req.body;

            await userService.changeRole(id, special_role);

            res.status(200).json("Account role has changed");
        } catch (e) {
            next(e);
        }
    }

    public async changeType(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { account_type } = req.body;

            await userService.changeType(id, account_type);

            res.status(200).json("Account type has changed");
        } catch (e) {
            next(e);
        }
    }

};

export const userController = new UserController();