import { Route } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard } from './auth.guard';

export const registerRoutes: Route[] = [
  { path: '', component: RegisterComponent },
];

export const loginRoutes: Route[] = [{ path: '', component: LoginComponent }];

export const settingsRoutes: Route[] = [
  { path: '', canActivate: [AuthGuard], component: SettingsComponent },
];
