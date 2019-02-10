import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { IStopsResponce, IStops } from '../../interfaces/stops.interface';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-transfers-filter',
  templateUrl: './transfers-filter.component.html',
  styleUrls: ['./transfers-filter.component.sass']
})
export class TransfersFilterComponent implements OnInit {
  stopsForm: FormGroup;
  stops: Array<IStops>;

  constructor(private fb: FormBuilder, private filterService: FilterService) {}

  ngOnInit() {
    this.getStopsCount();
  }

  initForm() {
    this.stopsForm = this.fb.group({
      stopsCount: this.buildStops()
    });
  }

  getStopsCount() {
    this.filterService
      .getStopsCount()
      .pipe(delay(200))
      .subscribe(
        (responce: IStopsResponce) => {
          this.stops = responce.stops;
        },
        err => {
          alert(err.message);
        },
        () => {
          console.log('Async fetching stops data complete');
          this.initForm();
        }
      );
  }

  // Getter for rendering a list of options in a template
  get stopsRender() {
    return this.stopsForm.get('stopsCount');
  }

  // Returning an array which consists from Form Controls
  buildStops() {
    const arr = this.stops.map(stop => {
      return this.fb.control(stop.selected);
    });
    return this.fb.array(arr);
  }

  formatData(data) {
    return data
      .filter(el => el === true)
      .map((el, i) => {
        return {
          id: this.stops[i].id,
          stopCount: this.stops[i].stopCount,
          selected: el
        };
      });
  }

  submit(value) {
    const formValue = Object.assign({}, value, {
      stopsCount: this.formatData(value.stopsCount)
    });
    console.log(formValue);
  }
}
