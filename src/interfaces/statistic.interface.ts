import { Types } from "mongoose";

export interface IStatistic {
    _carId: Types.ObjectId,
    _ownerId: Types.ObjectId,
    avg_price: number;
    views: number;
}