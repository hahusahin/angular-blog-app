import { Route } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { FeedComponent } from '../feed/feed.component';

export const homeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'feed', component: FeedComponent },
      { path: '', component: FeedComponent },
    ],
  },
];
