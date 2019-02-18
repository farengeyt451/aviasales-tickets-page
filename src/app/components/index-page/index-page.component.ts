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
  filteredTickets: Array<Tickets>;
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
    this.getExchangeRates();
    this.getStopsCount();
    this.getCurrentCurrencyType();
    this.getCurrentSortCondition();
  }

  getTickets(): void {
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

  getExchangeRates(): void {
    this.currencyService.getExchangeRates().subscribe(
      (responce: Currency) => {
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

  getStopsCount() {
    this.filterService.currentStopsCount.subscribe(
      (data: FormSubmit) => {
        this.stopsCount = data.stopsCount.map(el => el.stopCount);
        this.filterTickets(this.tickets, this.stopsCount);
      },
      error => {
        console.log(error);
      }
    );
  }

  getCurrentCurrencyType() {
    this.filterService.currentCurrencyType.subscribe(
      data => {
        this.currency = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCurrentSortCondition() {
    this.filterService.currentSortCondition.subscribe(
      data => {
        this.sortTickets(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  filterTickets(tickets: Array<Tickets>, stopsCount: Array<number>): Array<Tickets> {
    if (stopsCount.some(el => el < 0) || stopsCount.length === 0) {
      return (this.filteredTickets = tickets);
    } else {
      this.filteredTickets = tickets.filter(el => {
        return stopsCount.indexOf(el.stops) >= 0;
      });
    }
  }

  sortTickets(condition: string): Array<Tickets> {
    if (condition === 'up') {
      return (this.filteredTickets = this.filteredTickets.sort((a, b) =>
        a.stops >= b.stops ? 1 : -1
      ));
    } else {
      return (this.filteredTickets = this.filteredTickets.sort((a, b) =>
        a.stops > b.stops ? -1 : 1
      ));
    }
  }
}
