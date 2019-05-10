import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusAllocationsComponent } from './bus-allocations.component';

describe('BusAllocationsComponent', () => {
  let component: BusAllocationsComponent;
  let fixture: ComponentFixture<BusAllocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusAllocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusAllocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
