import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankyouSupporterComponent } from './thankyou-supporter.component';

describe('ThankyouSupporterComponent', () => {
  let component: ThankyouSupporterComponent;
  let fixture: ComponentFixture<ThankyouSupporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThankyouSupporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankyouSupporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
