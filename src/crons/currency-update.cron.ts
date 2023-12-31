import { CronJob } from "cron";

import { ECurrency } from "../enums";
import { ApiError } from "../errors";
import { currencyRepository } from "../repositories";
import { axiosService } from "../services";

const currencyUpdater = async function (): Promise<void> {
  try {
    const currencies = await axiosService.getCurrencies();
    await currencyRepository.createCurrency({
      base_ccy: ECurrency.UAH,
      usd_ccy: currencies[1].buy,
      eur_ccy: currencies[0].buy,
    });
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};

export const updateCurrency = new CronJob("0 0 * * *", currencyUpdater);
