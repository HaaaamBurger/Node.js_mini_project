import { Document } from "mongoose"
import { EAccountStatus } from "../enums";

export interface IUser extends Document{
    username: string;
    surname: string;
    age: number;
    acount_status: EAccountStatus;
    email: string;
    password: string;
}

export type TUserCredentials = Pick<IUser, "email" | "password">;