import { Injectable } from '@angular/core';
import { throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { FormSubmit } from '../interfaces/stops.interface';

@Injectable()
export class FilterService {
  constructor(private http: HttpClient) {}

  private currencyType = new Subject<string>();
  currentCurrencyType = this.currencyType.asObservable();

  private stopsCount = new Subject<FormSubmit>();
  currentStopsCount = this.stopsCount.asObservable();

  private sortCondition = new Subject<string>();
  currentSortCondition = this.sortCondition.asObservable();

  changeCurrencyType(cur: string) {
    this.currencyType.next(cur);
  }

  changeStopsCount(stopsCount: FormSubmit) {
    this.stopsCount.next(stopsCount);
  }

  changeSortCondition(condition: string) {
    this.sortCondition.next(condition);
  }

  getStopsCount() {
    return this.http.get('assets/data/filter.json').pipe(
      map(response => response),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
