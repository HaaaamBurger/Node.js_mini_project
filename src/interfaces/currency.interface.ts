export interface ICurrency {
    base_ccy: string;
    usd_ccy: string;
    eur_ccy: string;
}

export interface IExchnage {
    base_ccy: string;
    price: number;
}

export interface IPrices {
    UAH: number;
    USD: number;
    EUR: number;
}