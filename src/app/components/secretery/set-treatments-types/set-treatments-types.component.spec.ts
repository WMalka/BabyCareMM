import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTreatmentsTypesComponent } from './set-treatments-types.component';

describe('SetTreatmentsTypesComponent', () => {
  let component: SetTreatmentsTypesComponent;
  let fixture: ComponentFixture<SetTreatmentsTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetTreatmentsTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetTreatmentsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
