import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { CurrencyService } from '../../services/currency.service';
import { FilterService } from '../../services/filter.service';
import { TicketsResponce, Tickets } from '../../interfaces/tickets.interface';
import { Currency, CurrencyRates } from '../../interfaces/currency.interface';
import { delay } from 'rxjs/operators';
import { FormSubmit, Stops } from 'src/app/interfaces/stops.interface';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.sass']
})
export class IndexPageComponent implements OnInit {
  tickets: Array<Tickets>;
  curRates: CurrencyRates;
  currency: string;
  stopsCount: Array<number>;

  constructor(
    private ticketsService: TicketsService,
    private currencyService: CurrencyService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.getTickets();
    this.filterService.currentCurrencyType.subscribe(
      data => {
        this.currency = data;
      },
      error => {
        console.log(error);
      }
    );
    this.filterService.currentStopsCount.subscribe(
      (data: FormSubmit) => {
        this.stopsCount = data.stopsCount.map(el => el.stopCount);
        console.log(this.stopsCount);
        this.filterTickets(this.tickets, this.stopsCount);
      },
      error => {
        console.log(error);
      }
    );
    this.getExchangeRates();
  }

  getTickets() {
    this.ticketsService
      .getTickets()
      .pipe(delay(200))
      .subscribe(
        (responce: TicketsResponce) => {
          this.tickets = responce.tickets;
        },
        err => {
          alert(err.message);
        },
        () => {
          console.log('Async fetching tickets complete');
        }
      );
  }

  getExchangeRates() {
    this.currencyService.getExchangeRates().subscribe(
      (responce: Currency) => {
        console.log('responce', responce);
        this.curRates = responce.rates;
      },
      err => {
        alert(err.message);
      },
      () => {
        console.log('Async fetching exchange rates complete');
      }
    );
  }

  filterTickets(tickets: Array<Tickets>, stopsCount: Array<number>) {
    if (stopsCount.some(el => el < 0)) {
      return;
    }
  }
}
