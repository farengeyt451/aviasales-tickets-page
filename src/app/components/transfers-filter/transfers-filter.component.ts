import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { STOPS } from '../../fixtures/stops.fixture';
import { IStops } from '../../interfaces/stops.interface';

@Component({
  selector: 'app-transfers-filter',
  templateUrl: './transfers-filter.component.html',
  styleUrls: ['./transfers-filter.component.sass']
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

  // Геттер для рендера списка опций в шаблоне
  get stopsRender() {
    return this.stopsForm.get('stopsCount');
  }

  // Возвращаем массив из FormControl
  buildStops() {
    const arr = this.stops.map(stop => {
      return this.fb.control(stop.selected);
    });
    return this.fb.array(arr);
  }

  submit(value) {
    const formValue = Object.assign({}, value, {
      stopsCount: value.stopsCount.map((el, i) => {
        return {
          id: this.stops[i].id,
          stopCount: this.stops[i].stopCount,
          selected: el
        };
      })
    });
    console.log(formValue);
  }
}
