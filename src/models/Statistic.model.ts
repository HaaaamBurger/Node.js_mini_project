import { model, Schema } from "mongoose";

const StatisticModel = new Schema({
    avg_price: {
        type: Number
    },
    views: {
        type: Number,
    }
})

export const Statistic = model("statistic", StatisticModel);