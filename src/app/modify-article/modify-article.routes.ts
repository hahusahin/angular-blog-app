import { Route } from '@angular/router';
import { ModifyArticleComponent } from './modify-article.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as articleEffects from './store/effects';
import { ModifyArticleKey, modifyArticleReducer } from './store/reducers';

export const modifyArticleRoutes: Route[] = [
  {
    path: '',
    component: ModifyArticleComponent,
    providers: [
      provideEffects(articleEffects),
      provideState(ModifyArticleKey, modifyArticleReducer),
    ],
  },
];
