import { model, Schema, Types } from "mongoose";

import { ECities, ECurrency, EProducer } from "../enums";
import { User } from "./User.model";

const AdvertisementModel = new Schema(
  {
    producer: {
      type: String,
      enum: EProducer,
      required: true,
    },
    car_model: {
      type: String,
      required: true,
    },
    car_photo: {
      type: String,
    },
    city: {
      type: String,
      enum: ECities,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Object,
      required: true,
    },
    currency: {
      type: String,
      enum: ECurrency,
    },
    description: {
      type: String,
      required: false,
    },
    owner: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Advertisement = model("advertisement", AdvertisementModel);
