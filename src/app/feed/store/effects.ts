import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { feedActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { FeedService } from '../feed.service';

export const getFeedEffect = createEffect(
  (actions$ = inject(Actions), feedService = inject(FeedService)) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({ url }) =>
        feedService.getFeed(url).pipe(
          map((feed) => feedActions.getFeedSuccess({ feed })),
          catchError(() => of(feedActions.getFeedFailure()))
        )
      )
    );
  },
  { functional: true }
);

export const favoritesEffect = createEffect(
  (actions$ = inject(Actions), feedService = inject(FeedService)) => {
    return actions$.pipe(
      ofType(feedActions.handleFavorites),
      switchMap(({ slug, isFavorited }) => {
        const article$ = isFavorited
          ? feedService.removeFromFavorite(slug)
          : feedService.addToFavorites(slug);
        return article$.pipe(
          map((article) => feedActions.handleFavoritesSuccess({ article })),
          catchError(() => of(feedActions.handleFavoritesFailure()))
        );
      })
    );
  },
  { functional: true }
);
