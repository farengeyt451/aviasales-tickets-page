import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FilterService {
  private currencyType = new BehaviorSubject('rub');
  currentCurrencyType = this.currencyType.asObservable();

  changeCurrencyType(cur: string) {
    this.currencyType.next(cur);
  }
}
