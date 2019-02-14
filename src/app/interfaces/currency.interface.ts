export interface Currency {
  base: string;
  date: string;
  rates: CurrencyRates;
  success: boolean;
  timestamp: number;
}

export interface CurrencyRates {
  USD: number;
  EUR?: number;
  RUB: number;
}
