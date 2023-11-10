import { model, Schema, Types } from "mongoose";
import { EAccountRoles, EAccountStatus, EAccountTypes } from "../enums";
import { Advertisement } from "./Advertisement.model";

const UserModel = new Schema({
    username: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    account_type: {
        type: String,
        enum: EAccountTypes,
        default: EAccountTypes.BASIC,
        required: true,
    },
    account_status: {
        type: String,
        enum: EAccountStatus,
        default: EAccountStatus.ACTIVE,
        required: true
    },
    account_role: {
        type: String,
        enum: EAccountRoles,
        required: true
    }
},
    {
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false
    })

export const User = model("user", UserModel);