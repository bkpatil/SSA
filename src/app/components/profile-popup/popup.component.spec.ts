import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PPopupComponent } from './popup.component';

describe('PPopupComponent', () => {
  let component: PPopupComponent;
  let fixture: ComponentFixture<PPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
