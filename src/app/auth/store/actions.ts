import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  LoginRequestInterface,
  RegisterRequestInterface,
  UpdateUserRequest,
} from '../types';
import {
  BackendErrorsInterface,
  CurrentUserInterface,
} from '../../shared/types';

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

    'Update User': props<{ request: UpdateUserRequest }>(),
    'Update User Success': props<{ currentUser: CurrentUserInterface }>(),
    'Update User Failure': props<{ errors: BackendErrorsInterface }>(),

    Logout: emptyProps(),
  },
});
