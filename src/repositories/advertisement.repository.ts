import { ApiError } from "../errors";
import { IExchnage } from "../interfaces";
import { Currency } from "../models";


class AdvertisementRepository {
   public async convertCurrency(currency: IExchnage) {
       try {
           const currencies = await Currency.findOne();

           switch (currency.base_ccy) {
               case "UAH":
                   return {
                       UAH: currency.price,
                       USD: Number((Number(currency.price) / Number(currencies.usd_ccy)).toFixed(5)),
                       EUR: Number((Number(currency.price) / Number(currencies.eur_ccy)).toFixed(5)),
                   }
               case "USD":
                   return {
                       USD: currency.price,
                       UAH: Number((Number(currency.price) * Number(currencies.usd_ccy)).toFixed(5)),
                       EUR: Number((Number(currency.price) * Number(currencies.eur_ccy) / Number(currencies.usd_ccy)).toFixed(5)),
                   }
               case "EUR":
                   return {
                       EUR: currency.price,
                       USD: Number((Number(currency.price) * Number(currencies.usd_ccy) / Number(currencies.eur_ccy)).toFixed(5)),
                       UAH: Number((Number(currency.price) * Number(currencies.usd_ccy)).toFixed(5))
                   }
           }
       } catch (e) {
           throw new ApiError(e.message, e.status);
       }
   } 
}

export const advertisementRepository = new AdvertisementRepository();