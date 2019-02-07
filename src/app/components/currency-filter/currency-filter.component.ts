import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';

import { ICurrency, ICurrencyRates } from '../../interfaces/currency.interface';

@Component({
  selector: 'app-currency-filter',
  templateUrl: './currency-filter.component.html',
  styleUrls: ['./currency-filter.component.sass']
})
export class CurrencyFilterComponent implements OnInit {
  curRates: ICurrencyRates;
  currencyForm: FormGroup;

  constructor(private currencyService: CurrencyService, private fb: FormBuilder) {
    this.currencyForm = this.fb.group({
      currencyType: ['rub']
    });

    this.currencyForm.controls.currencyType.valueChanges.subscribe(value => {
      this.currencyService.changeCurrencyType(value);
    });
  }

  ngOnInit() {
    this.getExchangeRates();
  }

  getExchangeRates() {
    this.currencyService.getExchangeRates().subscribe(
      (responce: ICurrency) => {
        console.log(responce);
        this.curRates = responce.rates;
      },
      err => {
        alert(err.message);
        // TODO Add popup
      },
      () => {
        console.log('Async fetching data from fixer.io server complete');
      }
    );
  }
}
