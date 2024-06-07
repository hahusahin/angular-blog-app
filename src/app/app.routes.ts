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
    path: '',
    loadChildren: () => import('./home/home.routes').then((m) => m.homeRoutes),
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
];
