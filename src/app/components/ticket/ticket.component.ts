import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ITickets } from '../../interfaces/tickets.interface';
import { ICurrencyRates } from '../../interfaces/currency.interface';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.sass']
})
export class TicketComponent implements OnInit {
  @Input() renderTicket: ITickets;
  @Input() currencyType: string;
  @Input() curRates: ICurrencyRates;

  ticketPrice: number;
  stops: number = 0;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    changes.currencyType && this.getTicketPrice(changes.currencyType.currentValue);
  }

  setDate(date: string): Date {
    let dateParts = date.split('.');
    let year = Number(`20${dateParts[2]}`);
    let month = Number(dateParts[1]) - 1;
    let day = Number(dateParts[0]);
    return new Date(year, month, day);
  }

  returnDeclension(num: number): string {
    const cases = [2, 0, 1, 1, 1, 2];
    const titles = ['пересадка', 'пересадки', 'пересадок'];
    return titles[num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]];
  }

  getTicketPrice(type: string): void {
    if (type) {
      switch (type) {
        case 'usd':
          this.ticketPrice =
            this.renderTicket.price * (this.curRates.EUR / this.curRates.RUB) * this.curRates.USD;
          break;
        case 'eur':
          this.ticketPrice = this.renderTicket.price * (this.curRates.EUR / this.curRates.RUB);
          break;
        default:
          this.ticketPrice = this.renderTicket.price;
      }
    }
  }
}
