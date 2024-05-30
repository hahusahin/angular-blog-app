import { createActionGroup, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/register-request.interface';
import { CurrentUserInterface } from '../../shared/types/current-user.interface';
import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register Success': props<{ currentUser: CurrentUserInterface }>(),
    'Register Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
