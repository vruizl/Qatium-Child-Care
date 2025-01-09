import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeDebtComponent } from './time-debt.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../../app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChildCareService } from '../../services/child-care.service';
import { of } from 'rxjs';

describe('TimeDebtComponent', () => {
  let component: TimeDebtComponent;
  let fixture: ComponentFixture<TimeDebtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeDebtComponent],
      imports:      [NgbModule,
                     SharedModule],
      providers:    [NgbActiveModal,
                    {provide:ChildCareService,useValue:{getParents: () => of([]),
                                                        getChildCares: () => of([])
                                                       }
                    }
       ]
    });
    fixture = TestBed.createComponent(TimeDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
