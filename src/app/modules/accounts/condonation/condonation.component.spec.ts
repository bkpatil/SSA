import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondonationComponent } from './condonation.component';

describe('CondonationComponent', () => {
  let component: CondonationComponent;
  let fixture: ComponentFixture<CondonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
