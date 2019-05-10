import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusTrackComponent } from './add-bus-track.component';

describe('AddBusTrackComponent', () => {
  let component: AddBusTrackComponent;
  let fixture: ComponentFixture<AddBusTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBusTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBusTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
