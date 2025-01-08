import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';



export const landingPageRoutes: Routes = [
    {
        path: '',
        component: LandingPageComponent,        
        data: { fit: true }
    }
];