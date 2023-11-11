import { updateCurrency } from "./currency-update.cron"

export const cronRunner = () => {
    updateCurrency.start();
}
