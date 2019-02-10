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
  user = {
    skills: [{ name: 'JS', selected: false, id: 1 }, { name: 'CSS', selected: true, id: 2 }]
  };

  form: FormGroup;

  public stops: Array<IStops> = STOPS;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      stopsCount: this.buildSkills()
    });
  }

  ngOnInit() {}

  // Геттер для рендера списка опций в шаблоне
  get stopsRender() {
    return this.form.get('stopsCount');
  }

  // Возвращаем массив из FormControl
  buildSkills() {
    const arr = this.stops.map(stop => {
      return this.fb.control(stop.selected);
    });
    return this.fb.array(arr);
  }

  submit(form) {
    // const formValue = Object.assign({}, form, {
    //   stopsCount: form.stopsCount.map((selected, i) => {
    //     return {
    //       id: this.stops[i].id,
    //       stopCount: this.stops[i].stopCount,
    //       selected
    //     };
    //   })
    // });
    console.log(form);
  }
}
