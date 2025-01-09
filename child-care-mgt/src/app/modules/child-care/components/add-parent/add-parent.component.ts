import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChildCareService } from '../../services/child-care.service';
import { ToastService } from '../../../../../app/shared/services/toast/toast.service';
import { ModalActions } from '../../../../../app/shared/enums/modal-actions.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { AddParent } from '../../models/addParent.model';

@Component({
  selector: 'app-add-parent',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.scss']
})
export class AddParentComponent {
  public usersForm: FormGroup;
  public showErrors: boolean = false;
  @Output() userDataSaved:  EventEmitter<any> = new EventEmitter<any>();
  public userDataToSave: AddParent = new AddParent();

  private observableInvitations: Subscription;
  public isLoading: boolean = false;

  constructor(public activeModal: NgbActiveModal,
              public formBuilder: FormBuilder,
              public apiSrv: ChildCareService,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.initForm();
  }
  
  
  initForm(){
    this.usersForm = this.formBuilder.group({
      userName: [null, Validators.required],
    });
  }

  createUser(user:AddParent){
    this.isLoading = true;
    this.observableInvitations = this.apiSrv.addParent(user).subscribe({
      next: (response) =>
      {
        this.isLoading = false;
        this.toastService.showSuccessToast("Parent added");  
        this.userDataSaved.emit({action:ModalActions.CREATED,data:response});
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

  saveUserData(){
    //|| !this.groupsValidated
    if(this.usersForm.invalid ) {
      this.showErrors = true;
      }else{
        this.showErrors = false;
        this.setUserDataToSave();
        this.createUser(this.userDataToSave);
        
    }

  }

  private setUserDataToSave() {
    this.userDataToSave.name = this.usersForm.controls['userName'].value;
    console.log("Data saved:",this.userDataToSave);
  }

  ngOnDestroy(){
    if (!!this.observableInvitations){
      this.observableInvitations.unsubscribe();
    }
  }

}
