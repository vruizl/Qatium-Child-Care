import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildCareMgtComponent } from '../modules/child-care/components/child-care-mgt/child-care-mgt.component';


const routes: Routes = [  
  {
    path: 'login',
    loadChildren: () => import('../modules/landing-page/landing-page.module').then(m=> m.LandingPageModule),
    pathMatch: 'full' 
  },
  {
    path: 'portal',
    loadChildren: () => import('../modules/portal/portal.module').then(m=> m.PortalModule),
  },
  {
    path: 'child-care',
    loadChildren: () => import('../modules/child-care/child-care.module').then(m=> m.ChildCareModule),
  },
  {
    path:'',
    redirectTo:'child-care',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
