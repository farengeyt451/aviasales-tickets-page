import { Injectable } from '@angular/core';
import { throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { IFormSubmit } from '../interfaces/stops.interface';

@Injectable()
export class FilterService {
  constructor(private http: HttpClient) {}

  private currencyType = new Subject<string>();
  currentCurrencyType = this.currencyType.asObservable();

  private stopsCount = new Subject<IFormSubmit>();
  currentStopsCount = this.stopsCount.asObservable();

  changeCurrencyType(cur: string) {
    this.currencyType.next(cur);
  }

  changeStopsCount(stopsCount: IFormSubmit) {
    this.stopsCount.next(stopsCount);
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
