import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleEntity, FeedResponse } from '../types';

export const feedActions = createActionGroup({
  source: 'Feed',
  events: {
    'Get Feed': props<{ url: string }>(),
    'Get Feed Success': props<{ feed: FeedResponse }>(),
    'Get Feed Failure': emptyProps(),

    'Handle Favorites': props<{ slug: string; isFavorited: boolean }>(),
    'Handle Favorites Success': props<{ article: ArticleEntity }>(),
    'Handle Favorites Failure': emptyProps(),
  },
});
