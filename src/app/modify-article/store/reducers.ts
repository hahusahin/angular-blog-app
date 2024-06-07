import { createFeature, createReducer, on } from '@ngrx/store';
import { ModifyArticleState } from '../types';
import { modifyArticleActions } from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: ModifyArticleState = {
  isSubmitting: false,
  validationErrors: null,
};

const modifyArticleFeature = createFeature({
  name: 'modify-article',
  reducer: createReducer(
    initialState,
    on(modifyArticleActions.createArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(modifyArticleActions.createArticleSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(modifyArticleActions.createArticleFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: ModifyArticleKey,
  reducer: modifyArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = modifyArticleFeature;
