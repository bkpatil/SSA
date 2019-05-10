import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreExpensesComponent } from './store-expenses.component';

describe('StoreExpensesComponent', () => {
  let component: StoreExpensesComponent;
  let fixture: ComponentFixture<StoreExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
