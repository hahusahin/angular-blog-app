import { Route } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { ProfileFeatureKey, ProfileReducer } from './store/reducers';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as ProfileEffects from './store/effects';

export const profileRoutes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    providers: [
      ProfileService,
      provideState(ProfileFeatureKey, ProfileReducer),
      provideEffects(ProfileEffects),
    ],
  },
];
