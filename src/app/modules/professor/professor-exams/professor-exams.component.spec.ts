import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorExamsComponent } from './professor-exams.component';

describe('ProfessorExamsComponent', () => {
  let component: ProfessorExamsComponent;
  let fixture: ComponentFixture<ProfessorExamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorExamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
