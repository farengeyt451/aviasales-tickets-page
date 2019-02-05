import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { ITicketsResponce, ITickets } from '../../interfaces/tickets.interface';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.sass']
})
export class IndexPageComponent implements OnInit {
  tickets: Array<ITickets>;

  constructor(private ticketsService: TicketsService) {}

  ngOnInit() {
    this.getTickets();
  }

  getTickets() {
    this.ticketsService.getTickets().subscribe(
      (responce: ITicketsResponce) => {
        console.log(responce);
        this.tickets = responce.tickets;
      },
      err => {
        alert(err.message);
        // TODO Add popup
      },
      () => {
        console.log('Async data fetching from local server complete');
      }
    );
  }
}
