import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { STOPS } from '../../fixtures/stops.fixture';
import { IStops } from '../../interfaces/stops.interface';

@Component({
  selector: 'app-transfers-filter',
  templateUrl: './transfers-filter.component.html',
  styleUrls: ['./transfers-filter.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransfersFilterComponent implements OnInit {
  stopsForm: FormGroup;

  public stops: Array<IStops> = STOPS;

  constructor(private fb: FormBuilder) {
    this.stopsForm = this.fb.group({
      stopsCount: this.buildStops()
    });
  }

  ngOnInit() {}

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
