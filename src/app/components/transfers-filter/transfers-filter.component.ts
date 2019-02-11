import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { IStopsResponce, IStops, IStopFromForm } from '../../interfaces/stops.interface';
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
          console.log('Async fetching stops count complete');
          this.initForm();
        }
      );
  }

  // Func for async stopsForm init
  initForm() {
    this.stopsForm = this.fb.group({
      stopsCount: this.buildStops()
    });
    this.submit(this.stopsForm.value);
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

  // Formatting data for submitting
  formatData(data: Array<boolean>) {
    return data
      .map((el, i) => {
        return {
          id: this.stops[i].id,
          stopCount: this.stops[i].stopCount,
          selected: el
        };
      })
      .filter(el => el.selected === true);
  }

  submit(value: IStopFromForm) {
    const formValue = Object.assign({}, value, {
      stopsCount: this.formatData(value.stopsCount)
    });
    this.filterService.changeStopsCount(formValue);
  }

  isShowingBtn(index: number) {
    return (this.stopsForm.controls.stopsCount as FormArray).controls[index].value;
  }

  // Func to uncheck all checkboxes
  // Cuz checkboxes have (change) event on template this.submit will be called automatically
  checkOne() {
    (this.stopsForm.controls.stopsCount as FormArray).controls.forEach(el => {
      el.setValue(false);
    });
  }
}
