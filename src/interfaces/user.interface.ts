import { Document, Types } from "mongoose";

import {
  EAccountStatus,
  EAccountTypes,
  ECurrency,
  EProducer,
  ESpecialAccountRoles,
} from "../enums";

export interface IUser extends Document {
  username: string;
  surname: string;
  age: number;
  account_status: EAccountStatus;
  account_role: ESpecialAccountRoles;
  account_type: EAccountTypes;
  email: string;
  phone_number: string;
  password: string;
}

export interface IAdvertisement extends Document {
  producer: EProducer;
  car_model: string;
  year: number;
  city: string;
  car_photo: string;
  price: number | object;
  currency: ECurrency;
  owner: Types.ObjectId;
  description?: string;
}

export type TUserCredentials = Pick<IUser, "email" | "password">;
