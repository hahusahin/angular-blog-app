import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CurrentUserInterface } from '../../shared/types/current-user.interface';
import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';
import { LoginRequestInterface, RegisterRequestInterface } from '../types';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register Success': props<{ currentUser: CurrentUserInterface }>(),
    'Register Failure': props<{ errors: BackendErrorsInterface }>(),

    Login: props<{ request: LoginRequestInterface }>(),
    'Login Success': props<{ currentUser: CurrentUserInterface }>(),
    'Login Failure': props<{ errors: BackendErrorsInterface }>(),

    'Current User': emptyProps(),
    'Current User Success': props<{ currentUser: CurrentUserInterface }>(),
    'Current User Failure': emptyProps(),
  },
});
