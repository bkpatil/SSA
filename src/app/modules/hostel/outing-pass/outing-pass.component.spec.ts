import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutingPassComponent } from './outing-pass.component';

describe('OutingPassComponent', () => {
  let component: OutingPassComponent;
  let fixture: ComponentFixture<OutingPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutingPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutingPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
