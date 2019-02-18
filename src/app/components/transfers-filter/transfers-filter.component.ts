import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { StopsResponce, Stops, StopFromForm } from '../../interfaces/stops.interface';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-transfers-filter',
  templateUrl: './transfers-filter.component.html',
  styleUrls: ['./transfers-filter.component.sass']
})
export class TransfersFilterComponent implements OnInit {
  stopsForm: FormGroup;
  stops: Array<Stops>;

  constructor(private fb: FormBuilder, private filterService: FilterService) {}

  ngOnInit() {
    this.getStopsCount();
  }

  getStopsCount(): void {
    this.filterService
      .getStopsCount()
      .pipe(delay(200))
      .subscribe(
        (responce: StopsResponce) => {
          this.stops = responce.stops;
        },
        err => {
          alert(err.message);
        },
        () => {
          this.initForm();
        }
      );
  }

  // Func for async stopsForm init
  initForm(): void {
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
  buildStops(): FormArray {
    const arr = this.stops.map(stop => {
      return this.fb.control(stop.selected);
    });
    return this.fb.array(arr);
  }

  // Formatting data for submitting
  formatData(data: Array<boolean>): Array<Stops> {
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

  submit(value: StopFromForm): void {
    const formValue = Object.assign({}, value, {
      stopsCount: this.formatData(value.stopsCount)
    });
    this.filterService.changeStopsCount(formValue);
  }

  isShowingBtn(index: number): boolean {
    return (this.stopsForm.controls.stopsCount as FormArray).controls[index].value;
  }

  // Func to uncheck all checkboxes
  checkOne(i: number): void {
    (this.stopsForm.controls.stopsCount as FormArray).controls.forEach((el, index) => {
      if (el[index] !== i) {
        el.setValue(false);
      }
    });
    this.submit(this.stopsForm.value);
  }
}
