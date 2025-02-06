import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./features/collect-request/requests/requests.component').then(m => m.RequestsComponent),
          },
          {
            path: 'myrequests',
            loadComponent: () => import('./features/collect-request/requests/requests.component').then(m => m.RequestsComponent),
          },
        ]
      },


];
