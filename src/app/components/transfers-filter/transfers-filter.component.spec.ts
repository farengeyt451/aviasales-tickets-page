import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersFilterComponent } from './transfers-filter.component';

describe('TransfersFilterComponent', () => {
  let component: TransfersFilterComponent;
  let fixture: ComponentFixture<TransfersFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfersFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
