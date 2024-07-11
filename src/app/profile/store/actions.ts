import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProfileInterface } from '../profile.types';

export const userProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Get profile': props<{ slug: string }>(),
    'Get profile success': props<{ userProfile: ProfileInterface }>(),
    'Get profile failure': emptyProps(),
  },
});
