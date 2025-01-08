import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCareComponent } from './add-care.component';
import { ChildCareService } from '../../services/child-care.service';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../../app/shared/shared.module';
import '@angular/localize/init';
import { of, throwError } from 'rxjs';
import { Care } from '../../models/care.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Parent } from '../../models/parent.model';

describe('AddCareComponent', () => {
  let component: AddCareComponent;
  let fixture: ComponentFixture<AddCareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCareComponent],
      imports:      [NgbModule,
                     SharedModule],
      providers:    [NgbActiveModal,
                     {provide:ChildCareService,useValue:{getParents: () => of([])}}]
    });

    fixture = TestBed.createComponent(AddCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('AddCareComponent - Get parents list', () => {
  let component: AddCareComponent;
  let fixture: ComponentFixture<AddCareComponent>;
  let service: ChildCareService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCareComponent],
      imports:      [NgbModule,
                    SharedModule,
                    HttpClientTestingModule],
      providers:    [NgbActiveModal,
                    ChildCareService]
    });
    fixture = TestBed.createComponent(AddCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ChildCareService);
  });

  it('should datalist have values when getting parents returns values',() => {
    const responseChildCareAPI:Parent[] = [
      {
        id:1,
        name: "Alan Turing"
      },
      {
        id:2,
        name: "Ada Lovelace"
      },
      {
        id:3,
        name: "Angela Ruiz Robles"
      },
      {
        id:4,
        name: "Hedy Lamarr"
      }
    ]
    ; 

    jest.spyOn(service,'getParents').mockReturnValue(of(responseChildCareAPI));
    
    component.loadParents();
    fixture.detectChanges();

    expect(component.caretakersList.length).toBe(responseChildCareAPI.length);
    
  });

  it('should datalist empty when getting parents returns an error',() => {

    jest.spyOn(service,'getParents').mockImplementation(() => {
      return throwError(() => new Error('Error ocurred when fetching the data produts'))
    });
    const toast = jest.spyOn(component.toastService,'showErrorToast');

    component.loadParents();
    fixture.detectChanges();

    expect(toast).toHaveBeenCalled();

    expect(component.parentsList.length).toBe(0);
  });
});

describe('AddCareComponent - Create a care', () => {
  let component: AddCareComponent;
  let fixture: ComponentFixture<AddCareComponent>;  
  let service: ChildCareService;

  beforeEach(async () => {   
    await TestBed.configureTestingModule({
      declarations: [AddCareComponent],
      imports:      [NgbModule,
                     SharedModule,
                     HttpClientTestingModule],
      providers:    [NgbActiveModal,
                     ChildCareService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ChildCareService);
  });

  it('should close modal and show success message when the care is created succesfully',() => {
    const responseChildCareAPI:Care = 
    {
      caretakerId: 3,
      caretakerName: "Angela Ruiz Robles",
      duration: 150,
      observations: "Alan goes to the movies",
      parentId: 1,
      parentName: "Alan Turing",
      startDate: "16/08/2020 20:00"
    }; 

    jest.spyOn(service,'addCare').mockReturnValue(of(responseChildCareAPI));
    const emitter = jest.spyOn(component.careDataSaved, 'emit');
    const toast = jest.spyOn(component.toastService,'showSuccessToast');

    component.createCare({} as Care);
    
    expect(emitter).toHaveBeenCalled();
    expect(toast).toHaveBeenCalled();
  });

  it('should not close modal and show error message when the group is not created succesfully',() => {
    jest.spyOn(service,'addCare').mockImplementation(() => {
      return throwError(() => new Error('Error ocurred when creating the gropup'))
    });
    
    const toast = jest.spyOn(component.toastService,'showErrorToast');

    component.createCare({} as Care);

    expect(toast).toHaveBeenCalled();
  });
});