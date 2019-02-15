import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-sort-filter',
  templateUrl: './sort-filter.component.html',
  styleUrls: ['./sort-filter.component.sass']
})
export class SortFilterComponent implements OnInit {
  sortingValue: string;

  constructor(private filterService: FilterService) {}

  ngOnInit() {}

  sortTickets(val: string) {
    this.filterService.changeSortCondition(val);
  }
}
