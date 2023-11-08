import { model, Schema } from "mongoose";
import { EAccountStatus } from "../enums";


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
    acount_status: {
        type: String,
        enum: EAccountStatus,
        required: true,
        default: EAccountStatus.Basic
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
    }
},
    {
        timestamps: true,
        versionKey: false
    })

export const User = model("user", UserModel);