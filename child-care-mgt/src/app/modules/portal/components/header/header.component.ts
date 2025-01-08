import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public userName: string;

  

  constructor(private router:Router,){

  }

  ngOnInit(){
  }

  public logout(){
     this.router.navigate(['/login']); 
  }

}
