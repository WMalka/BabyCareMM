import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTreatmentsTypesModalComponent } from './set-treatments-types-modal.component';

describe('SetTreatmentsTypesModalComponent', () => {
  let component: SetTreatmentsTypesModalComponent;
  let fixture: ComponentFixture<SetTreatmentsTypesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetTreatmentsTypesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetTreatmentsTypesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
