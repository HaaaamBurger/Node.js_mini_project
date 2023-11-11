import joi from "joi";
import {ECities, ECurrency, EProducer } from "../enums";

export class AdvertisementValidator {
    static producer = joi.valid(...Object.values(EProducer));
    static car_model = joi.string();
    static year = joi.number().min(1990).max(new Date().getFullYear());
    static city = joi.valid(...Object.values(ECities));
    static price = joi.number().min(0).max(50000000);
    static currency = joi.valid(...Object.values(ECurrency));
    static description = joi.string().min(2).max(280);

    static createAdvertisement = joi.object({
        producer: this.producer.required(),
        car_model: this.car_model.required(),
        city: this.city.required(),
        year: this.year.required(),
        price: this.price.required(),
        currency: this.currency.required(),
        description: this.description,
    })

    static updateAdvertisement = joi.object({
        producer: this.producer,
        car_model: this.car_model,
        city: this.city,
        year: this.year,
        price: this.price,
        currency: this.currency,
        description: this.description,
    })
}