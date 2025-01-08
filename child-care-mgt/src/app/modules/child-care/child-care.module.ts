import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildCareMgtComponent } from './components/child-care-mgt/child-care-mgt.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { childCareRoutes } from './child-care.routes';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCareComponent } from './components/add-care/add-care.component';
import { AddParentComponent } from './components/add-parent/add-parent.component';
import { BalanceComponent } from './components/balance/balance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeDebtComponent } from './components/time-debt/time-debt.component';



@NgModule({
  declarations: [
    ChildCareMgtComponent,
    AddCareComponent,
    AddParentComponent,
    BalanceComponent,
    TimeDebtComponent,    
  ],
  imports: [
    CommonModule,
    NgxDatatableModule, 
    HttpClientModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ]
})
export class ChildCareModule { }
