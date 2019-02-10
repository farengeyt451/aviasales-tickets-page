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
      skills: this.buildSkills()
    });
  }

  ngOnInit() {
    console.log(this.stops);
  }

  get skills() {
    return this.form.get('skills');
  }

  buildSkills() {
    const arr = this.user.skills.map(skill => {
      return this.fb.control(skill.selected);
    });
    console.log(arr);

    return this.fb.array(arr);
  }

  submit(form) {
    const formValue = Object.assign({}, form, {
      skills: form.skills.map((selected, i) => {
        return {
          id: this.user.skills[i].id,
          selected,
          name: this.user.skills[i].name
        };
      })
    });
    console.log(formValue);
  }
}
