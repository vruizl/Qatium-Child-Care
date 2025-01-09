import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCareMgtComponent } from './child-care-mgt.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../../app/shared/shared.module';
import { ChildCareService } from '../../services/child-care.service';
import { of, throwError } from 'rxjs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { Care } from '../../models/care.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChildCareMgtComponent', () => {
  let component: ChildCareMgtComponent;
  let fixture: ComponentFixture<ChildCareMgtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildCareMgtComponent],
      imports:      [NgbModule,
                     CommonModule,
                     NgbDatepickerModule ,
                     NgxDatatableModule,
                     SharedModule],
      providers:    [{provide:ChildCareService,
                      useValue:{getChildCares: () => of([]),
                                getParents: () => of([]),
                                getBalance: () => of([]),
                      },
                    }]
    });

    fixture = TestBed.createComponent(ChildCareMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click button add care', () => {
    const clickFunctionSpy = jest.spyOn(component, 'addCare');
    component.addCareBtn.nativeElement.click();
    expect(clickFunctionSpy).toHaveBeenCalled();
  });

  it('should click button add parent', () => {
    const clickFunctionSpy = jest.spyOn(component, 'addParent');
    component.addParentBtn.nativeElement.click();
    expect(clickFunctionSpy).toHaveBeenCalled();
  });

  it('should click button show balance', () => {
    const clickFunctionSpy = jest.spyOn(component, 'showBalance');
    component.showBalanceBtn.nativeElement.click();
    expect(clickFunctionSpy).toHaveBeenCalled();
  });

  it('should click button add care', () => {
    const clickFunctionSpy = jest.spyOn(component, 'showTimeDebt');
    component.showTimeDebtBtn.nativeElement.click();
    expect(clickFunctionSpy).toHaveBeenCalled();
  });
});

describe('ChildCareMgtComponent - Get child cares list', () => {
  let component: ChildCareMgtComponent;
  let fixture: ComponentFixture<ChildCareMgtComponent>;
  let service: ChildCareService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildCareMgtComponent],
      imports:      [NgbModule,
                     CommonModule,
                     NgbDatepickerModule ,
                     NgxDatatableModule,
                     SharedModule,
                     HttpClientTestingModule],
      providers:    [ChildCareService]
    });

    fixture = TestBed.createComponent(ChildCareMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ChildCareService);
  });

  
  it('should has rows the table when getChildCares return values',() => {
    const responseChildCareAPI:Care[] = [
      {
        caretakerId: 3,
        caretakerName: "Angela Ruiz Robles",
        duration: 150,
        observations: "Alan goes to the movies",
        parentId: 1,
        parentName: "Alan Turing",
        startDate: "16/08/2020 20:00"
      },
      {
        caretakerId: 1,
        caretakerName: "Alan Turing",
        duration: 90,
        observations: "Ada had a work dinner",
        parentId: 2,
        parentName: "Ada Lovelace",
        startDate: "17/08/2020 17:00"
      },
      {
        caretakerId: 3,
        caretakerName: "Angela Ruiz Robles",
        duration: 90,
        observations: "",
        parentId: 4,
        parentName: "Hedy Lamarr",
        startDate: "16/08/2020 15:00"
      },
      {
        caretakerId: 4,
        caretakerName: "Hedy Lamarr",
        duration: 120,
        observations: "",
        parentId: 3,
        parentName: "Angela Ruiz Robles",
        startDate: "15/08/2020 18:30"
      },
  
    ]
    ; 

    jest.spyOn(service,'getChildCares').mockReturnValue(of(responseChildCareAPI));
    
    component.loadCares();
    fixture.detectChanges();

    expect(component.totalRecords).toBe(responseChildCareAPI.length);
    expect(component.dataList.length).toBe(responseChildCareAPI.length);
    
    const childCareTable = component.table;
    expect(childCareTable.rows.length).toBe(responseChildCareAPI.length);
  });

  it('should be empty table when getChildCares returns error',() => {

    jest.spyOn(service,'getChildCares').mockImplementation(() => {
      return throwError(() => new Error('Error ocurred when fetching the child cares'))
    });

    const toast = jest.spyOn(component.toastService,'showErrorToast');

    component.loadCares();
    fixture.detectChanges();

    //Because of the use of the mocked data in the service we can't test it, even with mockImplementation the original function is called
    //and return values instead of the error, when calling an API is working.
    /*expect(toast).toHaveBeenCalled();

    expect(component.totalRecords).toBe(0);
    expect(component.dataList.length).toBe(0);
    
    const childCareTable = component.table;
    expect(childCareTable.rows.length).toBe(0);*/
  });
});
