import { ApiError } from "../errors";
import {IAggregateReturn } from "../interfaces";
import {Advertisement, Statistic } from "../models";

class StatisticsService {
    public async createAdStatistic(city: string, adId: string): Promise<void> {
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

            await Statistic.create({
                avg_price: {
                  city_avg: {
                      name: city,
                      avg: `${averagePriceByCity[0].avg_price.toFixed(5)} $`
                  },
                  country_avg: `${averageByCountry[0].avg_price.toFixed(5)} $`,
                },
                advertisement: adId,
            })

        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const statisticsService = new StatisticsService();