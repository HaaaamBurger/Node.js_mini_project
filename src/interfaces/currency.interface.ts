import { ECurrency } from "../enums";

export interface ICurrency {
    base_ccy: string;
    usd_ccy: string;
    eur_ccy: string;
}

export interface IExchnage {
    base_ccy: string;
    price: number | object;
}

export interface IPrices {
    UAH: number;
    USD: number;
    EUR: number;
}

export interface IBankResponse {
    ccy: ECurrency,
    base_ccy: ECurrency,
    buy: string,
    sale: string
}