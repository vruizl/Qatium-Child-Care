import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './components/content/content.component';
import { HeaderComponent } from './components/header/header.component';
import { PortalComponent } from './components/portal/portal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { portalRoutes } from './portal.routes';
import { ChildCareModule } from '../child-care/child-care.module';



@NgModule({
  declarations: [
    ContentComponent,
    HeaderComponent,
    PortalComponent
  ],
  imports: [
    ChildCareModule,
    CommonModule,
    SharedModule,
    RouterModule,
    RouterModule.forChild(portalRoutes),
  ]
})
export class PortalModule { }
