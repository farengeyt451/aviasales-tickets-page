import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterService } from '../../services/filter.service';

import { CurrencyRates } from '../../interfaces/currency.interface';

@Component({
  selector: 'app-currency-filter',
  templateUrl: './currency-filter.component.html',
  styleUrls: ['./currency-filter.component.sass']
})
export class CurrencyFilterComponent implements OnInit {
  curRates: CurrencyRates;
  currencyForm: FormGroup;

  constructor(private fb: FormBuilder, private filterService: FilterService) {
    this.currencyForm = this.fb.group({
      currencyType: ['rub']
    });

    this.currencyForm.controls.currencyType.valueChanges.subscribe(
      value => {
        this.filterService.changeCurrencyType(value);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.filterService.changeCurrencyType('rub');
  }
}
