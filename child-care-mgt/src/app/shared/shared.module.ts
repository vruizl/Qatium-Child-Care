import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FeedbackButtonComponent } from './components/feedback-button/feedback-button.component';
import { SortingComponent } from './components/datatable/sorting/sorting.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';




@NgModule({
  declarations: [
    LoaderComponent,
    SortingComponent,
    FeedbackButtonComponent,
    CustomDropdownComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule,
  ],
  exports: [
    LoaderComponent,
    SortingComponent,
    FeedbackButtonComponent,
    CustomDropdownComponent
  ]
})
export class SharedModule { }
