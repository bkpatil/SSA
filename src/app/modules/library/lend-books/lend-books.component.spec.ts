import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LendBooksComponent } from './lend-books.component';

describe('LendBooksComponent', () => {
  let component: LendBooksComponent;
  let fixture: ComponentFixture<LendBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LendBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
