import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackButtonComponent } from './feedback-button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('FeedbackButtonComponent', () => {
  let component: FeedbackButtonComponent;
  let fixture: ComponentFixture<FeedbackButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackButtonComponent],
      imports: [NgbModule]
    });
    fixture = TestBed.createComponent(FeedbackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
