import { ECurrency } from "../enums";
import { ApiError } from "../errors";
import { ICurrency, IExchnage, IPrices } from "../interfaces";
import { Currency, Statistic } from "../models";
import { axiosService } from "../services";
import { currencyRepository } from "./currency.repository";


class AdvertisementRepository {
   public async convertCurrency(currency: IExchnage): Promise<IPrices> {
       try {
           let currencies = await Currency.findOne() as ICurrency;

           if (!currencies) {
               const bank_currencies = await axiosService.getCurrencies();
               const createdCurrencies = await currencyRepository.createCurrency({
                   base_ccy: ECurrency.UAH,
                   usd_ccy: bank_currencies[1].buy,
                   eur_ccy: bank_currencies[0].buy,
               });
               currencies = createdCurrencies;
           }

           switch (currency.base_ccy) {
               case "UAH":
                   return {
                       USD: Number((Number(currency.price) / Number(currencies.usd_ccy)).toFixed(5)),
                       EUR: Number((Number(currency.price) / Number(currencies.eur_ccy)).toFixed(5)),
                       UAH: Number(currency.price),
                   }
               case "USD":
                   return {
                       USD: Number(currency.price),
                       EUR: Number((Number(currency.price) * Number(currencies.eur_ccy) / Number(currencies.usd_ccy)).toFixed(5)),
                       UAH: Number((Number(currency.price) * Number(currencies.usd_ccy)).toFixed(5)),
                   }
               case "EUR":
                   return {
                       USD: Number((Number(currency.price) * Number(currencies.usd_ccy) / Number(currencies.eur_ccy)).toFixed(5)),
                       EUR: Number(currency.price),
                       UAH: Number((Number(currency.price) * Number(currencies.usd_ccy)).toFixed(5))
                   }
           }
       } catch (e) {
           throw new ApiError(e.message, e.status);
       }
   }

   public async viewsIncrement(adId: string): Promise<void> {
       try {
           await Statistic.findOneAndUpdate({ advertisement: adId }, { $inc: { views: 1 } })
       } catch (e) {
           throw new ApiError(e.message, e.status);
       }
   }
}

export const advertisementRepository = new AdvertisementRepository();
