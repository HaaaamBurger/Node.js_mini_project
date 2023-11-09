import { Request, Response, NextFunction } from "express";
import { userService } from "../services";
import {IAdvertisement, IUser } from "../interfaces";

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
            const { adId } = req.params;

            const advertisement = await userService.getUserById(adId);

            return res.status(200).json(advertisement);
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


};

export const userController = new UserController();