import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnBooksComponent } from './return-books.component';

describe('ReturnBooksComponent', () => {
  let component: ReturnBooksComponent;
  let fixture: ComponentFixture<ReturnBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
