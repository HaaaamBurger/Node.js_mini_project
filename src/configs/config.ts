import {config} from "dotenv";

config();

export const configs = {
    API_PORT: process.env.API_PORT,
};