import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentResultsComponent } from './parent-results.component';

describe('ParentResultsComponent', () => {
  let component: ParentResultsComponent;
  let fixture: ComponentFixture<ParentResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
