import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.settingsRoutes),
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('./modify-article/modify-article.routes').then(
        (m) => m.modifyArticleRoutes
      ),
  },
  {
    path: 'article/:slug',
    loadChildren: () =>
      import('./article/article.routes').then((m) => m.articleRoutes),
  },
  {
    path: 'profiles/:slug',
    loadChildren: () =>
      import('./profile/profile.routes').then((m) => m.profileRoutes),
  },
  {
    path: 'profiles/:slug/favorites',
    loadChildren: () =>
      import('./profile/profile.routes').then((m) => m.profileRoutes),
  },
  {
    path: '',
    loadChildren: () => import('./home/home.routes').then((m) => m.homeRoutes),
  },
];
