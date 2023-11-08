import { model, Schema } from "mongoose";
import {EAccountRoles, EAccountStatus } from "../enums";


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
    account_status: {
        type: String,
        enum: EAccountStatus,
        required: true,
        default: EAccountStatus.BASIC
    },
    account_role: {
        type: String,
        enum: EAccountRoles,
        required: true
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
},
    {
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false
    })

export const User = model("user", UserModel);