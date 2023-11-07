import express from "express";
import { configs } from "./configs/config";

const main = express();

main.use(express.json());
main.use(express.urlencoded({extended: true}));

main.listen(configs.API_PORT, async() => {
    console.log(`Server has started on ${configs.API_PORT} port!`);
})