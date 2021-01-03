import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMealTypesComponent } from './set-meal-types.component';

describe('SetMealTypesComponent', () => {
  let component: SetMealTypesComponent;
  let fixture: ComponentFixture<SetMealTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetMealTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetMealTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
