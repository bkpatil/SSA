import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenOrdersComponent } from './canteen-orders.component';

describe('CanteenOrdersComponent', () => {
  let component: CanteenOrdersComponent;
  let fixture: ComponentFixture<CanteenOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanteenOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanteenOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
