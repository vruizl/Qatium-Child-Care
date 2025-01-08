import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient:HttpClient) { }

  public postCall<T>(url:string,body:any){
    return this.httpClient.post<T>(url,body);
  }

  public getCall<T>(url:string){
    return this.httpClient.get<T>(url).pipe(
      catchError(e => {
        console.log("ERROR EN GET CALL",e);
        if (e.status === 401 )
        {
            return throwError(() => new Error('ServerError'));
        }
        else if (e.status === 403) 
        {
            return throwError(() => new Error('Unauthorized'));
        }
        else if (e.status === 404)
        {
            return throwError(() => new Error('NotFound'));
        }
        else{
          return throwError(() => new Error(e.message));
        }
      })
    );
   
  }

  public putCall<T>(url:string,body:any){
    return this.httpClient.put<T>(url,body);
  }

  public deleteCall<T>(url:string){
    return this.httpClient.delete<T>(url);
  }
}
