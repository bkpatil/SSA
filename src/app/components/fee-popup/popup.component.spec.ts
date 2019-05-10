import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FPopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let component: FPopupComponent;
  let fixture: ComponentFixture<FPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
