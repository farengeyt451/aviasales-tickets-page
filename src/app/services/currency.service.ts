import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
}
