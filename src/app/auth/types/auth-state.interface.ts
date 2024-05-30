import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';
import { CurrentUserInterface } from '../../shared/types/current-user.interface';

export interface AuthStateInterface {
  isLoading: boolean;
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null | undefined;
  validationErrors: BackendErrorsInterface | null;
}
