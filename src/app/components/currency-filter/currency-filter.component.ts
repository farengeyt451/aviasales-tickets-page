import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

    this.currencyForm.controls.currencyType.valueChanges.subscribe(
      value => {
        this.currencyService.changeCurrencyType(value);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {}
}
