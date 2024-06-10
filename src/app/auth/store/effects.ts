import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from '../../shared/services/persistance.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) =>
        authService.register(request).pipe(
          map((currentUser) => {
            persService.set('accessToken', currentUser.token);
            return authActions.registerSuccess({ currentUser });
          }),
          catchError((errorRes: HttpErrorResponse) =>
            of(authActions.registerFailure({ errors: errorRes.error.errors }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persService = inject(PersistanceService)
  ) =>
    actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) =>
        authService.login(request).pipe(
          map((currentUser) => {
            persService.set('accessToken', currentUser.token);
            return authActions.loginSuccess({ currentUser });
          }),
          catchError((errorRes: HttpErrorResponse) =>
            of(authActions.loginFailure({ errors: errorRes.error.errors }))
          )
        )
      )
    ),
  { functional: true }
);

export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.currentUser),
      switchMap(() => {
        const token = persService.get('accessToken');
        return !token
          ? of(authActions.currentUserFailure())
          : authService.getCurrentUser().pipe(
              map((currentUser) => {
                return authActions.currentUserSuccess({ currentUser });
              }),
              catchError(() => of(authActions.currentUserFailure()))
            );
      })
    );
  },
  { functional: true }
);

export const updateUserEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(authActions.updateUser),
      switchMap(({ request }) =>
        authService.updateUser(request).pipe(
          map((currentUser) => authActions.updateUserSuccess({ currentUser })),
          catchError((errorRes: HttpErrorResponse) =>
            of(authActions.updateUserFailure({ errors: errorRes.error.errors }))
          )
        )
      )
    ),
  { functional: true }
);

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(authActions.registerSuccess, authActions.loginSuccess),
      tap(() => router.navigateByUrl('/'))
    ),
  {
    functional: true,
    dispatch: false,
  }
);

export const logoutEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    persService = inject(PersistanceService)
  ) =>
    actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        persService.set('accessToken', null);
        router.navigateByUrl('/');
      })
    ),
  {
    functional: true,
    dispatch: false,
  }
);
