import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleBody } from '../../modify-article/types';
import { BackendErrorsInterface } from '../../shared/types';
import { ArticleEntity } from '../../feed/types';

export const modifyArticleActions = createActionGroup({
  source: 'Modify Article',
  events: {
    'Create Article': props<{ article: ArticleBody }>(),
    'Create Article Success': props<ArticleEntity>(),
    'Create Article Failure': props<{ errors: BackendErrorsInterface }>(),

    'Update Article': props<{ article: ArticleBody; slug: string }>(),
    'Update Article Success': props<ArticleEntity>(),
    'Update Article Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
