import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeDebtComponent } from './time-debt.component';

describe('TimeDebtComponent', () => {
  let component: TimeDebtComponent;
  let fixture: ComponentFixture<TimeDebtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeDebtComponent]
    });
    fixture = TestBed.createComponent(TimeDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
