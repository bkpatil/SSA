import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAttendance1Component } from './admin-attendance1.component';

describe('AdminAttendance1Component', () => {
  let component: AdminAttendance1Component;
  let fixture: ComponentFixture<AdminAttendance1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAttendance1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAttendance1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
