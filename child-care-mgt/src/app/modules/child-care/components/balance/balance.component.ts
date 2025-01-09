import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Balance } from '../../models/balance.model';
import { ChildCareService } from '../../services/child-care.service';
import { DataManagementService } from '../../../../../app/shared/services/data-management/data-management.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../../../app/shared/services/loader/loader.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent {
  public balanceList: Balance[] = [];
  
  public totalRecords : number = 0;
  public totalRecordsBL : number = 0;

  constructor(private apiSrv: ChildCareService,
              public activeModal: NgbActiveModal,
              public loaderSrv: LoaderService,
              private dataMgtSrv: DataManagementService,){}

ngOnInit(): void {
this.calculateBalance();
}

  calculateBalance():void{
    forkJoin([this.apiSrv.getParents(), this.apiSrv.getChildCares()]).subscribe({
      next: (response) =>
        {
         this.balanceList = this.dataMgtSrv.calculateBalance(response[0], response[1]);
         this.totalRecordsBL = this.balanceList.length;
        },
        error: (error:HttpErrorResponse) =>
        {
         // this.loaderSrv.hide();
         // this.toastService.showErrorToast(error.message);
          console.log(error);
        }
    });
  }
  
}
