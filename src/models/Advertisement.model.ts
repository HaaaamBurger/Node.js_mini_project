import { model, Schema, Types } from "mongoose";
import { User } from "./User.model";
import {ECurrency, EProducer } from "../enums";

const AdvertisementModel = new Schema({
    producer: {
        type: String,
        enum: EProducer,
        required: true,
    },
    car_model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        enum: ECurrency
    },
    description: {
        type: String,
        required: false,
    },
    owner: {
        type: Types.ObjectId,
        required: true,
        ref: User,
    }
},
    {
        timestamps: true,
        versionKey: false,
    })

export const Advertisement = model("advertisement", AdvertisementModel);