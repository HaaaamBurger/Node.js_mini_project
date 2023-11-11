import { ApiError } from "../errors";
import { IPriceStats, IPrices } from "../interfaces";
import {Advertisement, Statistic } from "../models";

interface IAggregateReturn {
    _id: number;
    avg_price: number;
}

class StatisticsService {
    public async createAdStatistic(city: string, adId: string, car_price: IPrices) {
        try {
            const averageByCountry: IAggregateReturn[] = await Advertisement.aggregate([
                {
                    $group: {
                        _id: null,
                        avg_price: { $avg: "$price.USD" }
                    }
                }
            ]);


            const averagePriceByCity: IAggregateReturn[] = await Advertisement.aggregate([
                {
                    $match: { city: city }
                },
                {
                    $group: {
                        _id: null,
                        avg_price: { $avg: `$price.USD` }
                    }
                },
            ])

            console.log(adId);

            await Statistic.create({
                car_price,
                avg_price: {
                  city_avg: {
                      name: city,
                      avg: averagePriceByCity[0].avg_price
                  },
                  country_avg: averageByCountry[0].avg_price,
                },
                advertisement: adId,
            })

        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const statisticsService = new StatisticsService();