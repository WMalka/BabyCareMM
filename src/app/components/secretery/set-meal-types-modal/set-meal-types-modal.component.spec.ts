import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMealTypesModalComponent } from './set-meal-types-modal.component';

describe('SetMealTypesModalComponent', () => {
  let component: SetMealTypesModalComponent;
  let fixture: ComponentFixture<SetMealTypesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetMealTypesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetMealTypesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
