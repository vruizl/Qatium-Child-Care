import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCareMgtComponent } from './child-care-mgt.component';

describe('ChildCareMgtComponent', () => {
  let component: ChildCareMgtComponent;
  let fixture: ComponentFixture<ChildCareMgtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildCareMgtComponent]
    });
    fixture = TestBed.createComponent(ChildCareMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
