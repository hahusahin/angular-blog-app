import { BackendErrorsInterface } from '../shared/types/backend-errors.interface';
import { CurrentUserInterface } from '../shared/types/current-user.interface';

export interface AuthResponseInterface {
  user: CurrentUserInterface;
}

export interface AuthStateInterface {
  isLoading: boolean;
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null | undefined;
  validationErrors: BackendErrorsInterface | null;
}

export interface RegisterRequestInterface {
  user: {
    email: string;
    password: string;
    username: string;
  };
}

export interface LoginRequestInterface {
  user: {
    email: string;
    password: string;
  };
}
