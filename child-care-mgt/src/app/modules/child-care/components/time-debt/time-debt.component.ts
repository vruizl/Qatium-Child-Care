import { Component } from '@angular/core';
import { ChildCareService } from '../../services/child-care.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../../../app/shared/services/loader/loader.service';
import { DataManagementService } from '../../../../../app/shared/services/data-management/data-management.service';
import { forkJoin } from 'rxjs';
import { Balance } from '../../models/balance.model';
import { ComputedTxns } from '../../../../../app/shared/models/netTo0.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-time-debt',
  templateUrl: './time-debt.component.html',
  styleUrls: ['./time-debt.component.scss']
})
export class TimeDebtComponent {

  constructor(private apiSrv: ChildCareService,
    public activeModal: NgbActiveModal,
    public loaderSrv: LoaderService,
    private dataMgtSrv: DataManagementService,){}

    public balanceList: Balance[] = [];
    public timeTxsList: ComputedTxns = [];
    public dataList: {caretaker: string, parent: string, duration: number}[] = [];
    public totalRecords = 0;
    
  ngOnInit(): void {
    this.calculateNet0();
  }

  calculateNet0():void{
    forkJoin([this.apiSrv.getParents(), this.apiSrv.getChildCares()]).subscribe({
      next: (response) =>
        {
         this.balanceList = this.dataMgtSrv.calculateBalance(response[0], response[1]);
         this.dataMgtSrv.setBalanceList(this.balanceList)
         this.timeTxsList = this.dataMgtSrv.getTransactions();
         this.timeTxsList.forEach(tx => {
          this.dataList.push({caretaker: tx.from_friend.name, parent: tx.to_friend.name, duration: +tx.amount});
         });
         this.totalRecords = this.dataList.length;
        },
        error: (error:HttpErrorResponse) =>
        {
          //this.loaderSrv.hide();
          //this.toastService.showErrorToast(error.message);
          console.log(error);
        }
    });
  

  
}
}
