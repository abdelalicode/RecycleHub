import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthserviceService);
  const router = inject(Router);

  if (!!authService.currentUserSignal()) {
    return true;
  }
  
  router.navigate(['login']);
  return false;
};
