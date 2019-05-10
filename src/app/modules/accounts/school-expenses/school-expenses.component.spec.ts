import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolExpensesComponent } from './school-expenses.component';

describe('SchoolExpensesComponent', () => {
  let component: SchoolExpensesComponent;
  let fixture: ComponentFixture<SchoolExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
