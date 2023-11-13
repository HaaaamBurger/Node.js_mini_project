export interface ICityAvg {
  name: string;
  avg: number;
}

export interface IPriceStats {
  city_avg: ICityAvg;
  country_avg: number;
}

export interface IViewStats {
  general_views: number;
  per_day: number;
  per_week: number;
  per_month: number;
}

export interface IStatistic {
  avg_price: IPriceStats;
  views: IViewStats;
}

export interface IAggregateReturn {
  _id: number;
  avg_price: number;
}
