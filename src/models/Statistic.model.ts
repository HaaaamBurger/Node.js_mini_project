import { model, Schema, Types } from "mongoose";

import { Advertisement } from "./Advertisement.model";

const StatisticModel = new Schema({
    avg_price: {
        type: Object,
        required: true,
    },
    views: {
        type: Object,
        default: 0,
        required: true
    },
    advertisement: {
        type: Types.ObjectId,
        required: true,
        ref: Advertisement,
    }
},
    {
        versionKey: false
    })

export const Statistic = model("statistic", StatisticModel);
