import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class ToastService {

  constructor() { }

  public  showSuccessToast(message: string = null){
    Swal.fire({
      text: message, 
      icon: 'success',
      showConfirmButton: false,
      toast:true,
      position: 'top',
      timer: 2000
    });
  }

  public showErrorToast(message: string = null){
    Swal.fire({
      text: message ,
      icon: 'error',
      showConfirmButton: false,
      toast:true,
      position: 'top',
      timer: 3000,
      width: '500px'
    });
  }
}
