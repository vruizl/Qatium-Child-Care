import { Injectable } from '@angular/core';
import { Care } from 'src/app/modules/child-care/models/care.model';
import { Parent } from 'src/app/modules/child-care/models/parent.model';
import { ComputedTxns, randomId, TimeDebtType, GiverType, ReceiverType, } from '../../models/netTo0.model';
import { Balance } from 'src/app/modules/child-care/models/balance.model';

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

  calculateTotals(parentsList: Parent[], carelist: Care[]){
    let balanceList = [];
    parentsList.forEach(parent => {
      let balance = 0;
      carelist.forEach(care => {
      if(care.parentId === parent.id){
          balance += care.duration;
        }
        /*if(care.caretakerId === parent.id){
          balance += care.duration;
        }*/
      });
      balanceList.push({parentId: parent.id, parentName: parent.name, balance: balance, isNegative: balance < 0});
    });
    return balanceList;
  }

  /*0 DEBT */

  private timeDebts: TimeDebtType;
  private balanceList: Balance[] = [];

  setBalanceList(balanceList: Balance[]){
    this.balanceList = balanceList;
    this.transformBalanceListToExpenses();
  }

  transformBalanceListToExpenses(){
    let tdList:  TimeDebtType = [];
    this.balanceList.forEach(balance =>{
      let ex = {
        amount: balance.balance,
        friend: {
          id: balance.parentId,
          name: balance.parentName
        }
      }
      tdList.push(ex);
    });

    this.setValues(tdList);
  }

  setValues(timeDebts: TimeDebtType) {
      this.timeDebts = timeDebts;
  }

  public get_transactions(): ComputedTxns {
      // pool: bins and items (creditors and debtors)
      // bins: creditors to whom pool(debtors) owes time to
      // items: debtors who owe time to the pool(creditors)
      const [givers, receivers] = this.calculate_givers_and_receivers();

      // if there's only one debtor to be paid by the pool's creditors
      if (givers.length === 1) {
          const giver = givers[0];

          return receivers.map((receiver) => ({
              id: randomId(),
              from_friend: receiver.friend,
              to_friend: giver.friend,
              amount: receiver.amount,
          }));
      }

      const result: ComputedTxns = [];

      receivers.forEach((receiver) => {
          let item_amount = receiver.amount;

          // item goes through every bin to find the best fit
          for (let i = 0, len = givers.length; i < len; i++) {
              const giver = givers[i];

              // item can fit in this giver
              if (+giver.amount >= +item_amount) {
                giver.amount -= item_amount; // decrease giver amount
                  result.push({
                      id: randomId(),
                      from_friend: receiver.friend,
                      to_friend: giver.friend,
                      amount: item_amount,
                  });

                  // we'll move to the next item
                  return;
              }
          }

          // so this item couldn't fit in any giver,
          // we'll distribute it among givers
          givers.forEach((giver) => {
              if (item_amount <= 0 || giver.amount <= 0) return;

              let amount: number;

              // if itme is bigger for this giver
              if (+item_amount >= +giver.amount) {
                  item_amount -= giver.amount;
                  amount = giver.amount;
              } else {
                  giver.amount -= item_amount;
                  amount = item_amount;
              }

              result.push({
                  id: randomId(),
                  from_friend: receiver.friend,
                  to_friend: giver.friend,
                  amount: amount,
              });
          });
      });

      console.log(result);
      return result;
  }

  private calculate_givers_and_receivers(): [GiverType, ReceiverType] {

      let givers: GiverType = [];
      let receivers: ReceiverType = [];

      this.timeDebts.forEach((exp) => {
          if (exp.amount > 0) {
              givers.push({
                  friend: exp.friend,
                  amount: exp.amount,
              });
          } else if (exp.amount < 0) {
            receivers.push({
                  friend: exp.friend,
                  amount: Math.abs(exp.amount),
              });
          }
      });

      return [givers, receivers];
  }
}
