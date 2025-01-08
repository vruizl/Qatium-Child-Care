import { Routes } from '@angular/router';
import { PortalComponent } from './components/portal/portal.component';
import { ChildCareMgtComponent } from '../child-care/components/child-care-mgt/child-care-mgt.component';

export const portalRoutes: Routes = [
  { 
    path: '', 
    component: PortalComponent, 
    children: 
    [ 
        {
            path: '',
            redirectTo: 'child-care',
            pathMatch: 'full'
        },
        {
            path: 'child-care', 
            component: ChildCareMgtComponent
        }
    ] 
}]; 
