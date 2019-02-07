import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getExchangeRatesUrl: string =
    'http://data.fixer.io/api/latest?access_key=6e5b2c885d7ad20260debe950a37d508&symbols=USD,EUR,RUB&format=1';

  getExchangeRates() {
    return this.http.get(this.getExchangeRatesUrl).pipe(
      map(response => response),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  private currencyType = new BehaviorSubject('rub');
  currentCurrencyType = this.currencyType.asObservable();

  changeCurrencyType(cur: string) {
    this.currencyType.next(cur);
  }
}
