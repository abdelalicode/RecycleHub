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
      {
        path : 'login',
        loadComponent: () => {
            return import('./components/auth/login/login.component').then((m) => m.LoginComponent)
        }
    },
    {
        path : 'register',
        loadComponent: () => {
            return import('./components/auth/register/register.component').then((m) => m.RegisterComponent)
        }
    },


];
