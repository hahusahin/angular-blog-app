import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { userProfileActions } from './actions';
import { ProfileService } from '../profile.service';
import { ProfileInterface } from '../profile.types';

export const getProfileEffect = createEffect(
  (actions$ = inject(Actions), userProfileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(userProfileActions.getProfile),
      switchMap(({ slug }) => {
        return userProfileService.getUserProfile(slug).pipe(
          map((userProfile: ProfileInterface) => {
            return userProfileActions.getProfileSuccess({ userProfile });
          }),
          catchError(() => {
            return of(userProfileActions.getProfileFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
