import { Route } from '@angular/router';
import { ModifyArticleComponent } from './modify-article.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as articleEffects from './store/effects';
import { ModifyArticleKey, modifyArticleReducer } from './store/reducers';
import { AuthGuard } from '../auth/auth.guard';

export const modifyArticleRoutes: Route[] = [
  {
    path: '',
    component: ModifyArticleComponent,
    canActivate: [AuthGuard],
    providers: [
      provideEffects(articleEffects),
      provideState(ModifyArticleKey, modifyArticleReducer),
    ],
  },
];
