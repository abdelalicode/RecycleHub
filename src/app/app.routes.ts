import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { noauthGuard } from './core/guards/noauth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { AddRequestComponent } from './features/collect-request/add-request/add-request.component';
import { Component } from '@angular/core';
import { CollectRequestComponent } from './features/collector/collect-request/collect-request.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [authGuard],
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
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'add-request',
        component: AddRequestComponent
      },
      {
        path: 'collector-dash',
        component: CollectRequestComponent
      },
      {
        path : 'login',
        canActivate: [noauthGuard],
        loadComponent: () => {
            return import('./components/auth/login/login.component').then((m) => m.LoginComponent)
        }
    },
    {
        path : 'register',
        canActivate: [noauthGuard],
        loadComponent: () => {
            return import('./components/auth/register/register.component').then((m) => m.RegisterComponent)
        }
    },


];
