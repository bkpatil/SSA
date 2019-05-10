import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainFeedbackComponent } from './maintain-feedback.component';

describe('MaintainFeedbackComponent', () => {
  let component: MaintainFeedbackComponent;
  let fixture: ComponentFixture<MaintainFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
