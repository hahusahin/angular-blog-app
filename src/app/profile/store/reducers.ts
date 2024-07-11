import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';
import { userProfileActions } from './actions';
import { ProfileStateInterface } from '../profile.types';

const initialState: ProfileStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(userProfileActions.getProfile, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(userProfileActions.getProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })),
    on(userProfileActions.getProfileFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: ProfileFeatureKey,
  reducer: ProfileReducer,
  selectIsLoading,
  selectError,
  selectData: selectUserProfileData,
} = userProfileFeature;
