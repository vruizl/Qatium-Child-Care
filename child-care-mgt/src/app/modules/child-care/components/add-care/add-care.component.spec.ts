import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCareComponent } from './add-care.component';

describe('AddCareComponent', () => {
  let component: AddCareComponent;
  let fixture: ComponentFixture<AddCareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCareComponent]
    });
    fixture = TestBed.createComponent(AddCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
