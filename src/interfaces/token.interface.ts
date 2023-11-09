import { Types } from "mongoose";

export interface ITokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface ITokenPayload {
    _userId: Types.ObjectId;
    email: string;
    account_status: string;
}