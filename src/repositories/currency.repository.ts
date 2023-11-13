import { ApiError } from "../errors";
import { ICurrency } from "../interfaces";
import { Currency } from "../models";

class CurrencyRepository {
  public async createCurrency(currencies: ICurrency): Promise<ICurrency> {
    try {
      await Currency.deleteMany();
      return (await Currency.create(currencies)) as ICurrency;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const currencyRepository = new CurrencyRepository();
