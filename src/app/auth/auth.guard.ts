import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { PersistanceService } from '../shared/services/persistance.service';

export const AuthGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const persistanceService = inject(PersistanceService);
  const router = inject(Router);

  const token = persistanceService.get('accessToken');

  return !!token ? true : router.createUrlTree(['/login']);
};
