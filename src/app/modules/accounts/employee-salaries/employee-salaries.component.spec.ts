import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalariesComponent } from './employee-salaries.component';

describe('EmployeeSalariesComponent', () => {
  let component: EmployeeSalariesComponent;
  let fixture: ComponentFixture<EmployeeSalariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSalariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
