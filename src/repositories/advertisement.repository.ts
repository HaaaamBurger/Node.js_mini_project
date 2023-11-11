import { ApiError } from "../errors";
import { IExchnage, IPrices } from "../interfaces";
import { Currency, Statistic } from "../models";


class AdvertisementRepository {
   public async convertCurrency(currency: IExchnage): Promise<IPrices> {
       try {
           const currencies = await Currency.findOne();

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