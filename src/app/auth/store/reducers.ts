import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions } from './actions';
import { AuthStateInterface } from '../types';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: AuthStateInterface = {
  isLoading: false,
  isSubmitting: false,
  currentUser: undefined,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(
      authActions.register,
      authActions.login,
      authActions.updateUser,
      (state) => ({
        ...state,
        isSubmitting: true,
        validationErrors: null,
      })
    ),
    on(
      authActions.registerSuccess,
      authActions.loginSuccess,
      authActions.updateUserSuccess,
      (state, action) => ({
        ...state,
        isSubmitting: false,
        currentUser: action.currentUser,
      })
    ),
    on(
      authActions.registerFailure,
      authActions.loginFailure,
      authActions.updateUserFailure,
      (state, action) => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      })
    ),
    on(authActions.currentUser, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.currentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.currentUserFailure, (state) => ({
      ...state,
      isLoading: false,
      currentUser: null,
    })),
    on(authActions.logout, () => ({
      ...initialState,
      currentUser: null,
    })),
    on(routerNavigationAction, (state) => ({
      ...state,
      validationErrors: null,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature;
