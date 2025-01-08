import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Care } from '../models/care.model';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http-service/http-service.service';
import { AddCare } from '../models/addCare.model';
import { AddParent } from '../models/addParent.model';
import { Parent } from '../models/parent.model';

@Injectable({
  providedIn: 'root'
})
export class ChildCareService {
  protected apiEndpoints = {
    GetChildCares: `${environment.BackendAPI}/cares`,
    AddCare: `${environment.BackendAPI}/cares`,
    GetParents: `${environment.BackendAPI}/parents`,
    AddParent: `${environment.BackendAPI}/parents`,
  }
  
  constructor(private httpClient: HttpService) { }

  addCare(childCare:AddCare):Observable<Care>{
    let newCare = {
      caretakerId: childCare.caretakerId,
      caretakerName: this.listOfParents.find(p => p.id === childCare.caretakerId)?.name || '',
      duration: childCare.duration,
      observations: childCare.observations,
      parentId: childCare.parentId,
      parentName: this.listOfParents.find(p => p.id === childCare.parentId)?.name || '',
      startDate: childCare.startDate
    };
    this.listOfCares.push(newCare);
    return of(newCare);
    
    //return this.httpClient.postCall<Care>(this.apiEndpoints.AddCare,childCare);
  }

  getChildCares():Observable<Care[]>{
    return of(this.listOfCares);
    //return this.httpClient.getCall<Care[]>(this.apiEndpoints.GetChildCares);
  }

  addParent(parent:AddParent):Observable<Parent>{
    let newParent = {
      id: this.listOfParents.length+1, //any random number
      name: parent.name
    };
    this.listOfParents.push(newParent);
    return of(newParent);

    //return this.httpClient.postCall<Parent>(this.apiEndpoints.AddParent,parent);
  }

  getParents():Observable<Parent[]>{
    return of (this.listOfParents)
    //return this.httpClient.getCall<Parent[]>(this.apiEndpoints.GetParents);
  }

  private listOfParents: Parent[] = [
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

  private listOfCares: Care[] = [
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
    },

  ];
}
