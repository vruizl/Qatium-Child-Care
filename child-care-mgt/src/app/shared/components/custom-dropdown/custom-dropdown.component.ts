import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent implements OnInit{
  @Input() dropdownName: string;  
  @Input() dataList: any[];
  @Input() placeHolder: string;
  @Input() resetSelectedValue: boolean;
  @Input() selectedOptionId: number;
  @Output() selectedValue:  EventEmitter<any> = new EventEmitter<any>();

  public selectedItem:any = null;
  public isSelectedItem: boolean = false;
  public dropdownDisabled: boolean = true;

  ngOnInit(){
    this.dropdownDisabled = this.dataList?.length<=0;
    if(this.resetSelectedValue) {
      this.selectedItem = null;
      this.isSelectedItem = false;
    }
    if(this.selectedOptionId>-1)
      this.selectDefaultOption();
      
  }

  ngOnChanges(){
    this.dropdownDisabled = this.dataList?.length<=0;
    if(this.resetSelectedValue) {
      this.resetValue();
    }
    if(this.selectedOptionId>-1)
      this.selectDefaultOption();
   }

  resetValue(){
    this.selectedItem = null;
    this.isSelectedItem = false;
   }

  onOptionSelected(optionSelected:any){
    this.selectedItem = optionSelected;
    this.isSelectedItem = true;
    this.selectedValue.emit(optionSelected);
  }

  selectDefaultOption(){
    var item = this.dataList.find((item) => item.id == this.selectedOptionId);
    if(!!item){
      this.selectedItem = item;
      this.isSelectedItem = true;
    }
  }
}
