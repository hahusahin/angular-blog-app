import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PersistanceService } from './persistance.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const persistanceService = inject(PersistanceService);
  const token = persistanceService.get('accessToken');
  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
    },
  });
  return next(modifiedReq);
};
