import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorAcademicsComponent } from './professor-academics.component';

describe('ProfessorAcademicsComponent', () => {
  let component: ProfessorAcademicsComponent;
  let fixture: ComponentFixture<ProfessorAcademicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorAcademicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorAcademicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
