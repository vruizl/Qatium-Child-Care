import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { landingPageRoutes } from './landing-page.routes';



@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(landingPageRoutes),
  ]
})
export class LandingPageModule { }
