import { ApiError } from "../errors";

class StatisticService {
    public async getAveragePrice(price: number) {
        try {

        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const statisticService = new StatisticService();