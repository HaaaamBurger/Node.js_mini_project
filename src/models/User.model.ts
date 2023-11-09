import { model, Schema } from "mongoose";
import { EAccountRoles, EAccountTypes } from "../enums";


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
    account_type: {
        type: String,
        enum: EAccountTypes,
        required: true,
        default: EAccountTypes.BASIC
    },
    account_status: {

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