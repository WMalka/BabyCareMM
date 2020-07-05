import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecreteryComponent } from './secretery.component';

describe('SecreteryComponent', () => {
  let component: SecreteryComponent;
  let fixture: ComponentFixture<SecreteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecreteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecreteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



