import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FeedResponse } from '../types';

export const feedActions = createActionGroup({
  source: 'Feed',
  events: {
    'Get Feed': props<{ url: string }>(),
    'Get Feed Success': props<{ feed: FeedResponse }>(),
    'Get Feed Failure': emptyProps(),
  },
});
