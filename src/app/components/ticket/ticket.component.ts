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
}
