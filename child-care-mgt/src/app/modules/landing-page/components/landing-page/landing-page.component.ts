import { Component } from '@angular/core';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

 
  loginDisplay = false;
  
  constructor(private router: Router){

  }

  
  ngOnInit(): void {
   
  }

  

  login(){ 
    this.router.navigate(['/portal']);
  }


}
