import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getExchangeRatesUrl: string = 'https://api.exchangeratesapi.io/latest?symbols=USD,RUB';

  getExchangeRates() {
    return this.http.get(this.getExchangeRatesUrl).pipe(
      map(response => response),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
