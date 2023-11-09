import express from "express";
import * as mongoose from "mongoose";

import { Request, Response, NextFunction } from "express";
import { configs } from "./configs";
import { ApiError } from "./errors";
import {advertisementRouter, authRouter, userRouter } from "./routers";


const main = express();

main.use(express.json());
main.use(express.urlencoded({extended: true}));

main.use("/auth", authRouter);
main.use("/users", userRouter);
main.use("/advertisement", advertisementRouter)

main.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;

    res.status(status).json({
        message: error.message,
        status: error.status
    })
})

main.listen(configs.API_PORT, async() => {
    await mongoose.connect(configs.API_DATABASE_URI);
    console.log(`Server has started on ${configs.API_PORT} port!`);
})