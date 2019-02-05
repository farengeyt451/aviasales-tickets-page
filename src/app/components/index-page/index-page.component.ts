import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.sass']
})
export class IndexPageComponent implements OnInit {
  tickets: Array<Object>;

  constructor() {}

  ngOnInit() {
    // this.getTickets();
  }

  // getTickets() {
  //   this.ticketService.getTickets().subscribe(
  //     responce => {
  //       console.log(responce);
  //     },
  //     err => {
  //       console.log(err);
  //     },
  //     () => {
  //       console.log('complete');
  //     }
  //   );
  // }
}
