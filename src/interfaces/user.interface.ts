import { Document } from "mongoose"
import { EAccountStatus } from "../enums";
import {EAccountRoles} from "../enums/account_roles.enum";

export interface IUser extends Document{
    username: string;
    surname: string;
    age: number;
    acount_status: EAccountStatus;
    account_role: EAccountRoles
    email: string;
    password: string;
}

export type TUserCredentials = Pick<IUser, "email" | "password">;