import { Component, OnInit } from '@angular/core';
import { STOPS } from '../../fixtures/stops.fixture';

@Component({
  selector: 'app-transfers-filter',
  templateUrl: './transfers-filter.component.html',
  styleUrls: ['./transfers-filter.component.sass']
})
export class TransfersFilterComponent implements OnInit {
  public stops: Array<Object> = STOPS;

  constructor() {}

  ngOnInit() {
    console.log(this.stops);
  }
}
