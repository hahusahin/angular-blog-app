import { Route } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { FeedComponent } from '../feed/feed.component';
import { AuthGuard } from '../auth/auth.guard';

export const homeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'feed', canActivate: [AuthGuard], component: FeedComponent },
      { path: '', component: FeedComponent },
    ],
  },
];
