import { ApiError } from "../errors";
import { ICurrency } from "../interfaces";
import { Currency } from "../models";

class CurrencyRepository {
    public async createCurrency(currencies: ICurrency): Promise<void> {
        try {
            await Currency.deleteMany();
            await Currency.create(currencies);
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const currencyRepository = new CurrencyRepository();