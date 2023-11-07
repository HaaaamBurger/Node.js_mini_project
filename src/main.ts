import express from "express";
import * as mongoose from "mongoose";
import { configs } from "./configs";
import { userRouter } from "./routers";




const main = express();

main.use(express.json());
main.use(express.urlencoded({extended: true}));

main.use("users", userRouter)

main.listen(configs.API_PORT, async() => {
    await mongoose.connect(configs.API_DATABASE_URI);
    console.log(`Server has started on ${configs.API_PORT} port!`);
})