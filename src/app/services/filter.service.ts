import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class FilterService {
  constructor(private http: HttpClient) {}

  private currencyType = new BehaviorSubject('rub');
  currentCurrencyType = this.currencyType.asObservable();

  changeCurrencyType(cur: string) {
    this.currencyType.next(cur);
  }

  getStopsCount() {
    return this.http.get('/assets/data/filter.json').pipe(
      map(response => response),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
