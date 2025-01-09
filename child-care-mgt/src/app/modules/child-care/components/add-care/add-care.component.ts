import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ChildCareService } from '../../services/child-care.service';
import { ToastService } from '../../../../../app/shared/services/toast/toast.service';
import { AddCare } from '../../models/addCare.model';
import { Subscription } from 'rxjs';
import { ModalActions } from '../../../../../app/shared/enums/modal-actions.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { Parent } from '../../models/parent.model';
import { CustomAdapter, CustomDateParserFormatter } from '../../adapters/custom-date-formatter';
import { CustomDatepickerI18n, I18n } from '../../adapters/date-picker-i18';

@Component({
  selector: 'app-add-care',
  templateUrl: './add-care.component.html',
  styleUrls: ['./add-care.component.scss'],
  providers: [  { provide: NgbDateAdapter, useClass: CustomAdapter },
                { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
                I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
})
export class AddCareComponent {
  public careForm: FormGroup;
  public showErrors: boolean = false;
  @Output() careDataSaved:  EventEmitter<any> = new EventEmitter<any>();
  public careDataToSave: AddCare = new AddCare();

  private observable: Subscription;
  public isLoading: boolean = false;

  public caretakersList: Parent[] = [];
  public parentsList: Parent[] = [];
  private caretakerSelected: number = 0;
  private parentSelected: number = 0;
  public dateSelected: string;
  public timeSelected: string;
  public resetParent = false;
  public parentRequiredError = false;
  public caretakerRequiredError = false;

  date: NgbDate | null ; 
  calendar = inject(NgbCalendar);
	formatter = inject(NgbDateParserFormatter);
  invalidDateFormat = false;
  invalidTimeFormat = false;

  model: NgbDateStruct;
  time = { hour: 0o0, minute: 0o0 };


  constructor(public activeModal: NgbActiveModal,
              public formBuilder: FormBuilder,
              public apiSrv: ChildCareService,
              public toastService: ToastService) { }

  ngOnInit(): void {
    this.loadParents();
    this.initForm();
  }
  
  
  initForm(){
    this.careForm = this.formBuilder.group({
      duration: [null, Validators.required],
      observations: [null, Validators.required]
    });
  }

  loadParents(){
    this.observable = this.apiSrv.getParents()
    .subscribe({
      next: (response:Parent[]) =>
      {
        this.caretakersList = response;
      },
      error: (error:HttpErrorResponse) =>
      {
        this.toastService.showErrorToast(error.message);
        console.log(error);
      }
    });
  }

  onCareTakerSelected(ctSelected:any){
    this.caretakerSelected = ctSelected.id;
    this.getParentsList(ctSelected);
  }

  getParentsList(caretaker: Parent) {
    this.parentsList = this.caretakersList.filter(x => x.id != caretaker.id);
  }

  onParentSelected(parentSelected:any){
    this.parentSelected = parentSelected.id;
  }

  onDateSelection(date: NgbDate) {
    this.dateSelected = date.day + "/" + date.month + "/" + date.year;
	}

   //when modifying a date in the input field
	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
    this.invalidDateFormat = !(this.calendar.isValid(NgbDate.from(parsed)) || input==null || input==undefined || input=="");
		let f =  parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    f = (input==null || input==undefined || input=="") ? null : f;
    this.dateSelected = f ==null ? "" : f.day + "/" + f.month + "/" + f.year;;
    return f;
	}

 
  createCare(care:AddCare){
    this.isLoading = true;
    this.observable = this.apiSrv.addCare(care).subscribe({
      next: (response) =>
      {
        this.isLoading = false;
        this.toastService.showSuccessToast("Care added");  
        this.careDataSaved.emit({action:ModalActions.CREATED,data:response});
        this.activeModal.dismiss(ModalActions.CREATED);
      },
      error: (error:HttpErrorResponse) =>
      {
        this.isLoading = false;
        this.toastService.showErrorToast(error.message);
        console.log(error);
      }
    }
    );
  }

  saveCareData(){
    this.timeSelected = this.time.hour.toString().padStart(2,"0")+ ":" + this.time.minute.toString().padStart(2,"0");
    if(this.careForm.invalid ) {
      this.showErrors = true;
    }else if(this.parentSelected == 0){
      this.showErrors = true;
      this.parentRequiredError = true;
    }else if(this.caretakerSelected == 0){
      this.showErrors = true;
      this.caretakerRequiredError = true;
    }
    else if(this.time.hour<0o0 || this.time.hour>24 || this.time.minute<0o0 || this.time.minute>59){
      this.showErrors = true;
      this.invalidTimeFormat = true;
    }else{
        this.showErrors = false;
        this.invalidTimeFormat = false;
        this.setCareDataToSave();
        this.createCare(this.careDataToSave);
    }
  }

  private setCareDataToSave() {
    this.careDataToSave.caretakerId = this.caretakerSelected;
    this.careDataToSave.parentId = this.parentSelected;
    this.careDataToSave.duration = this.careForm.controls['duration'].value;
    this.careDataToSave.observations = this.careForm.controls['observations'].value;
    this.careDataToSave.startDate = this.dateSelected + " " + this.timeSelected;
    console.log("Data saved:",this.careDataToSave);
  }
  
  ngOnDestroy(){
    if (!!this.observable){
      this.observable.unsubscribe();
    }
  }
}
