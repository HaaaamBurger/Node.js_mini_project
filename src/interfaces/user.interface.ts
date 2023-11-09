import { Document } from "mongoose"
import { EAccountStatus, ECurrency, EProducer, ESpecialAccountRoles } from "../enums";

export interface IUser extends Document{
    username: string;
    surname: string;
    age: number;
    account_status: EAccountStatus;
    account_role: ESpecialAccountRoles
    email: string;
    password: string;
}

export interface IAdvertisement extends Document{
    producer: EProducer;
    car_model: string;
    year: number;
    price: number;
    currency: ECurrency;
    description?: string;
}

export type TUserCredentials = Pick<IUser, "email" | "password">;