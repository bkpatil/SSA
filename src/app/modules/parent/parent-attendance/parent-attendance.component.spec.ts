import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAttendanceComponent } from './parent-attendance.component';

describe('ParentAttendanceComponent', () => {
  let component: ParentAttendanceComponent;
  let fixture: ComponentFixture<ParentAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
