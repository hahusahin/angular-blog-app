import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PopularTagsService } from '../popular-tags.service';
import { popularTagsActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const getTagsEffect = createEffect(
  (actions$ = inject(Actions), tagsService = inject(PopularTagsService)) => {
    return actions$.pipe(
      ofType(popularTagsActions.getTags),
      switchMap(() =>
        tagsService.getPopularTags().pipe(
          map((tags) => popularTagsActions.getTagsSuccess({ tags })),
          catchError(() => of(popularTagsActions.getTagsFailure()))
        )
      )
    );
  },
  { functional: true }
);
