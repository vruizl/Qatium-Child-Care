import { Injectable } from '@angular/core';
import { Care } from 'src/app/modules/child-care/models/care.model';
import { Parent } from 'src/app/modules/child-care/models/parent.model';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  constructor() { }

  calculateBalance(parentsList: Parent[], carelist: Care[]){
    let balanceList = [];
    parentsList.forEach(parent => {
      let balance = 0;
      carelist.forEach(care => {
        if(care.parentId === parent.id){
          balance -= care.duration;
        }
        if(care.caretakerId === parent.id){
          balance += care.duration;
        }
      });
      balanceList.push({parentId: parent.id, parentName: parent.name, balance: balance, isNegative: balance < 0});
    });
    return balanceList;
  }
}
