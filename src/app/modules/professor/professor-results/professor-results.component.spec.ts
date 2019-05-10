import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorResultsComponent } from './professor-results.component';

describe('ProfessorResultsComponent', () => {
  let component: ProfessorResultsComponent;
  let fixture: ComponentFixture<ProfessorResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
