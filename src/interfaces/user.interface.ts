import { Document, Types } from "mongoose"
import { EAccountStatus, ECurrency, EProducer } from "../enums";
import { EAccountRoles } from "../enums/account_roles.enum";

export interface IUser extends Document{
    username: string;
    surname: string;
    age: number;
    account_status: EAccountStatus;
    account_role: EAccountRoles
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