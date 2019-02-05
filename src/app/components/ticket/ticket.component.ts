import { Component, OnInit, Input } from '@angular/core';
import { ITickets } from '../../interfaces/tickets.interface';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.sass']
})
export class TicketComponent implements OnInit {
  @Input() renderTicket: ITickets;
  constructor() {}

  ngOnInit() {
    console.log(this.renderTicket);
  }

  setDate(date: string): Date {
    let dateParts = date.split('.');
    let year = Number(`20${dateParts[2]}`);
    console.log('year', year);
    let month = Number(dateParts[1]);
    console.log('month', month);
    let day = Number(dateParts[0]);
    console.log('day', day);
    return new Date(year, month, day);
  }
}
