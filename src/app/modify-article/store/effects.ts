import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModifyArticleService } from '../modify-article.service';
import { modifyArticleActions } from './actions';

export const createArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    articleService = inject(ModifyArticleService)
  ) => {
    return actions$.pipe(
      ofType(modifyArticleActions.createArticle),
      switchMap(({ article }) =>
        articleService.createArticle(article).pipe(
          map((article) => modifyArticleActions.createArticleSuccess(article)),
          catchError((errorRes: HttpErrorResponse) =>
            of(
              modifyArticleActions.createArticleFailure({
                errors: errorRes.error.errors,
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const updateArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    articleService = inject(ModifyArticleService)
  ) => {
    return actions$.pipe(
      ofType(modifyArticleActions.updateArticle),
      switchMap(({ article, slug }) =>
        articleService.updateArticle(article, slug).pipe(
          map((article) => modifyArticleActions.updateArticleSuccess(article)),
          catchError((errorRes: HttpErrorResponse) =>
            of(
              modifyArticleActions.updateArticleFailure({
                errors: errorRes.error.errors,
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const redirectArticleCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(
        modifyArticleActions.createArticleSuccess,
        modifyArticleActions.updateArticleSuccess
      ),
      tap((article) => router.navigate(['article', article.slug]))
    ),
  {
    functional: true,
    dispatch: false,
  }
);
