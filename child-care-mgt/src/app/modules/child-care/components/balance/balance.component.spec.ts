import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceComponent } from './balance.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../../app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChildCareService } from '../../services/child-care.service';
import { of } from 'rxjs';

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceComponent],
      imports:      [NgbModule,
                     SharedModule],
      providers:    [NgbActiveModal,
                    {provide:ChildCareService,useValue:{getParents: () => of([]),
                                                        getChildCares: () => of([])
                                                      }
                    }
      ]
    });
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
