import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './auth/store/reducers';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { AuthInterceptor } from './shared/services/auth-interceptor';
import { FeedFeatureKey, feedReducer } from './feed/store/reducers';
import * as authEffects from './auth/store/effects';
import * as feedEffects from './feed/store/effects';
import * as tagsEffects from './popular-tags/store/effects';
import {
  PopularTagsFeatureKey,
  popularTagsReducer,
} from './popular-tags/store/reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideState(FeedFeatureKey, feedReducer),
    provideState(PopularTagsFeatureKey, popularTagsReducer),
    provideEffects(authEffects, feedEffects, tagsEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
