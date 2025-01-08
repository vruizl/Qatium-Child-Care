import { Component, ViewChild } from '@angular/core';
import { Care } from '../../models/care.model';
import { Subscription } from 'rxjs';
import { ChildCareService } from '../../services/child-care.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Balance } from '../../models/balance.model';
import { AddParentComponent } from '../add-parent/add-parent.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BalanceComponent } from '../balance/balance.component';
import { AddCareComponent } from '../add-care/add-care.component';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { LoaderBgColor } from 'src/app/shared/enums/loader-bg-color.enum';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-child-care-mgt',
  templateUrl: './child-care-mgt.component.html',
  styleUrls: ['./child-care-mgt.component.scss']
})
export class ChildCareMgtComponent {
  public dataList : Care[] = [];
  public filteredList: Care[] = [];
  private observable: Subscription;
  public balanceList: Balance[] = [];
  
  public totalRecords : number = 0;
  public totalRecordsBL : number = 0;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private apiSrv: ChildCareService,
              public loaderSrv: LoaderService,
              private modalService: NgbModal,
              private toastService: ToastService){}

  ngOnInit(): void {
    this.loadCares();
  }

  loadCares(): void
  { 
    this.loaderSrv.show(null,LoaderBgColor.TRANSPARENT);
    
    this.observable = this.apiSrv.getChildCares()
    .subscribe({
      next: (response) =>
      {
        this.dataList= JSON.parse(JSON.stringify(response));
        this.filteredList = response.sort((a,b) => a.startDate > b.startDate ? -1 : 1);
        this.totalRecords = this.filteredList.length;
        this.loaderSrv.hide();
      },
      error: (error:HttpErrorResponse) =>
      {
        this.loaderSrv.hide();
        this.toastService.showErrorToast(error.message);
        console.log(error);
      }
    }
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.dataList.filter(function (d) {
      return (
        d.caretakerName.toLowerCase().indexOf(val) !== -1
        || d.parentName.toLowerCase().indexOf(val) !== -1 
        || !val
      );
    });
    
    // update the rows
    this.filteredList = temp;
    this.totalRecords = this.filteredList.length;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

   /*
   We did the sorting like this instead of "automatic" because the use of an ng-template on the header
   makes the sorting not working properly.
   It's necessary to indicate the "prop" property in the sortable columns so this function has that info to find the values to order
    */
   onSort(event) {
    this.loaderSrv.show(null,LoaderBgColor.TRANSPARENT);
    const rows = [...this.filteredList];
    const sort = event.sorts[0];
    rows.sort((a, b) => {
      return a[sort.prop].localeCompare(b[sort.prop]) * (sort.dir === 'desc' ? -1 : 1);
    });
    this.filteredList = rows;
    this.loaderSrv.hide();
  }

  addParent():void{
    const modalRef = this.modalService.open(AddParentComponent, { size: 'lg',centered: true,backdrop : 'static',  });
    modalRef.componentInstance.userDataSaved.subscribe((receivedEntry) => {
    });
  }

  showBalance():void{
    const modalRef = this.modalService.open(BalanceComponent, { size: 'lg',centered: true,backdrop : 'static',  });
  }

  addCare():void{
    const modalRef = this.modalService.open(AddCareComponent, { size: 'lg',centered: true,backdrop : 'static',  });
    modalRef.componentInstance.careDataSaved.subscribe((receivedEntry) => {
      this.dataList.push(receivedEntry.data);
      this.filteredList =  [...this.dataList];
    });
  }

  ngOnDestroy(){
    if (!!this.observable){
      this.observable.unsubscribe();
    }
  }
}
