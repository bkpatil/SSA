import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenExpensesComponent } from './canteen-expenses.component';

describe('CanteenExpensesComponent', () => {
  let component: CanteenExpensesComponent;
  let fixture: ComponentFixture<CanteenExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanteenExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanteenExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
