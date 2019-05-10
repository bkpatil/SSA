import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFeeRecordComponent } from './student-fee-record.component';

describe('StudentFeeRecordComponent', () => {
  let component: StudentFeeRecordComponent;
  let fixture: ComponentFixture<StudentFeeRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFeeRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFeeRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
