export interface ICurrency {
  base: string;
  date: string;
  rates: ICurrencyRates;
  success: boolean;
  timestamp: number;
}

export interface ICurrencyRates {
  USD: number;
  EUR: number;
  RUB: number;
}
