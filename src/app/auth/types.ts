import { BackendErrorsInterface, CurrentUserInterface } from '../shared/types';

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

export interface UpdateUserRequest {
  user: {
    email?: string;
    username?: string;
    password?: string;
    bio?: string;
    image?: string;
  };
}
