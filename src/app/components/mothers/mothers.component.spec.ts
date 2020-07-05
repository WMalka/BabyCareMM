import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MothersComponent } from './mothers.component';

describe('MothersComponent', () => {
  let component: MothersComponent;
  let fixture: ComponentFixture<MothersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MothersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MothersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
