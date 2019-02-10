import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { CurrencyService } from '../../services/currency.service';
import { FilterService } from '../../services/filter.service';
import { ITicketsResponce, ITickets } from '../../interfaces/tickets.interface';
import { ICurrency, ICurrencyRates } from '../../interfaces/currency.interface';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.sass']
})
export class IndexPageComponent implements OnInit {
  tickets: Array<ITickets>;
  curRates: ICurrencyRates;
  currency: string;

  constructor(
    private ticketsService: TicketsService,
    private currencyService: CurrencyService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.getTickets();
    this.filterService.currentCurrencyType.subscribe(cur => {
      this.currency = cur;
    });
    this.getExchangeRates();
  }

  getTickets() {
    this.ticketsService
      .getTickets()
      .pipe(delay(0))
      .subscribe(
        (responce: ITicketsResponce) => {
          this.tickets = responce.tickets;
        },
        err => {
          alert(err.message);
          // TODO Add popup
        },
        () => {
          console.log('Async fetching data from local server complete');
        }
      );
  }

  getExchangeRates() {
    this.currencyService.getExchangeRates().subscribe(
      (responce: ICurrency) => {
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
