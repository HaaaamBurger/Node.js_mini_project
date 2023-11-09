import { Types } from "mongoose";
import { EAccountStatus, ESpecialAccountRoles } from "../enums";

export interface ITokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface ITokenPayload {
    _userId: Types.ObjectId;
    email: string;
    account_status: EAccountStatus;
    account_role: ESpecialAccountRoles
}