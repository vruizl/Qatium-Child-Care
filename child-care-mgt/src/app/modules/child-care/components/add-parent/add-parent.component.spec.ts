import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParentComponent } from './add-parent.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../../app/shared/shared.module';
import { ChildCareService } from '../../services/child-care.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AddParentComponent', () => {
  let component: AddParentComponent;
  let fixture: ComponentFixture<AddParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddParentComponent],
      imports:      [NgbModule,
                     SharedModule],
      providers:    [NgbActiveModal,
                    {provide:ChildCareService,useValue:{addParent: () => of([])}}
                    ]
    });
    fixture = TestBed.createComponent(AddParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
