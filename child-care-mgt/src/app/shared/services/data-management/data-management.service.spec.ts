import { TestBed } from '@angular/core/testing';

import { DataManagementService } from './data-management.service';
import { Care } from 'src/app/modules/child-care/models/care.model';
import { Parent } from 'src/app/modules/child-care/models/parent.model';
import { Balance } from 'src/app/modules/child-care/models/balance.model';
import { ComputedTxns } from '../../models/netTo0.model';

describe('DataManagementService', () => {
  let service: DataManagementService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataManagementService]
    });
    service = TestBed.inject(DataManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('DataManagementService - calculateTotals', () => {
  let service: DataManagementService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataManagementService]
    });
    service = TestBed.inject(DataManagementService);
  });

  it('should return data when list of parents and list of cares', () => {
    const listOfCares:Care[] = [
      {
        caretakerId: 3,
        caretakerName: "Angela Ruiz Robles",
        duration: 150,
        observations: "Alan goes to the movies",
        parentId: 1,
        parentName: "Alan Turing",
        startDate: "16/08/2020 20:00"
      },
      {
        caretakerId: 1,
        caretakerName: "Alan Turing",
        duration: 90,
        observations: "Ada had a work dinner",
        parentId: 2,
        parentName: "Ada Lovelace",
        startDate: "17/08/2020 17:00"
      },
      {
        caretakerId: 3,
        caretakerName: "Angela Ruiz Robles",
        duration: 90,
        observations: "",
        parentId: 4,
        parentName: "Hedy Lamarr",
        startDate: "16/08/2020 15:00"
      },
      {
        caretakerId: 4,
        caretakerName: "Hedy Lamarr",
        duration: 120,
        observations: "",
        parentId: 3,
        parentName: "Angela Ruiz Robles",
        startDate: "15/08/2020 18:30"
      }] ; 

    const listOfParents: Parent[] = [
      {
        id:1,
        name: "Alan Turing"
      },
      {
        id:2,
        name: "Ada Lovelace"
      },
      {
        id:3,
        name: "Angela Ruiz Robles"
      },
      {
        id:4,
        name: "Hedy Lamarr"
      }
    ];

    const expectedResult: Balance[] = [
      {
        parentId: 1,
        parentName: 'Alan Turing',
        balance: -60,
        isNegative: true
      },
      {
        parentId: 2,
        parentName: 'Ada Lovelace',
        balance: -90,
        isNegative: true
      },
      {
        parentId: 3,
        parentName: 'Angela Ruiz Robles',
        balance: 120,
        isNegative: false
      },
      {
        parentId: 4,
        parentName: 'Hedy Lamarr',
        balance: 30,
        isNegative: false
      }
    ];

    const res = service.calculateBalance(listOfParents,listOfCares);
    expect(res.length).toEqual(4);
    expect(res).toEqual(expectedResult);
  });
});

describe('DataManagementService - calculate child care transactions', () => {
  let service: DataManagementService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataManagementService]
    });
    service = TestBed.inject(DataManagementService);
  });

  it('should return minimum number of transactions', () => {
    const balancesList: Balance[] = [
      {
        parentId: 1,
        parentName: 'Alan Turing',
        balance: -60,
        isNegative: true
      },
      {
        parentId: 2,
        parentName: 'Ada Lovelace',
        balance: -90,
        isNegative: true
      },
      {
        parentId: 3,
        parentName: 'Angela Ruiz Robles',
        balance: 120,
        isNegative: false
      },
      {
        parentId: 4,
        parentName: 'Hedy Lamarr',
        balance: 30,
        isNegative: false
      }
    ];

    const expectedResult :ComputedTxns = [
      {
        id: 80,
        from_friend: { id: 1, name: 'Alan Turing' },
        to_friend: { id: 3, name: 'Angela Ruiz Robles' },
        amount: 60
      },
      {
        id: 204,
        from_friend: { id: 2, name: 'Ada Lovelace' },
        to_friend: { id: 3, name: 'Angela Ruiz Robles' },
        amount: 60
      },
      {
        id: 134,
        from_friend: { id: 2, name: 'Ada Lovelace' },
        to_friend: { id: 4, name: 'Hedy Lamarr' },
        amount: 30
      }
    ];

    service.setBalanceList(balancesList)
    const res = service.getTransactions();
    expect(res.length).toEqual(3);
    expect(res[0].from_friend).toEqual({ id: 1, name: 'Alan Turing' });
    expect(res[0].to_friend).toEqual({ id: 3, name: 'Angela Ruiz Robles' });
    expect(res[0].amount).toEqual(60);
    
  });
});
