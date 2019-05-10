import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenFeedbackComponent } from './canteen-feedback.component';

describe('CanteenFeedbackComponent', () => {
  let component: CanteenFeedbackComponent;
  let fixture: ComponentFixture<CanteenFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanteenFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanteenFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
