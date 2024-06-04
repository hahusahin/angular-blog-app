import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const popularTagsActions = createActionGroup({
  source: 'Popular Tags',
  events: {
    'Get Tags': emptyProps(),
    'Get Tags Success': props<{ tags: string[] }>(),
    'Get Tags Failure': emptyProps(),
  },
});
