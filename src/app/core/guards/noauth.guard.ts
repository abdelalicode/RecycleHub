import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';

export const noauthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthserviceService);
  const router = inject(Router);
  
  const currentUser = localStorage.getItem('user');
  if (!currentUser) {
    return true;
  }

  router.navigate(['']);
  return false;
};
