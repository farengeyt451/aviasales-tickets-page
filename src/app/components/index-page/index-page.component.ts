import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { CurrencyService } from '../../services/currency.service';
import { FilterService } from '../../services/filter.service';
import { TicketsResponce, Tickets } from '../../interfaces/tickets.interface';
import { Currency, CurrencyRates } from '../../interfaces/currency.interface';
import { FormSubmit } from '../../interfaces/stops.interface';
import { delay } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

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
    this.renderTickets();
    this.getExchangeRates();
    this.getCurrentCurrencyType();
    this.getCurrentSortCondition();
  }

  renderTickets(): void {
    combineLatest([this.getTickets(), this.getStopsCount()]).subscribe(
      response => {
        this.tickets = (response[0] as TicketsResponce).tickets;
        this.stopsCount = (response[1] as FormSubmit).stopsCount.map(el => el.stopCount);
        this.filterTickets(this.tickets, this.stopsCount);
      },
      err => {
        alert(err);
      }
    );
  }

  getTickets(): Observable<Object> {
    return this.ticketsService.getTickets().pipe(delay(200));
  }

  getStopsCount(): Observable<Object> {
    return this.filterService.currentStopsCount;
  }

  getExchangeRates(): void {
    this.currencyService.getExchangeRates().subscribe(
      (responce: Currency) => {
        this.curRates = responce.rates;
      },
      err => {
        alert(err.message);
      }
    );
  }

  getCurrentCurrencyType(): void {
    this.filterService.currentCurrencyType.subscribe(
      data => {
        this.currency = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCurrentSortCondition(): void {
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
