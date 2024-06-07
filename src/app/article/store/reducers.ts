import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { ArticleState } from '../types';
import { articleActions } from './actions';

const initialState: ArticleState = {
  isLoading: false,
  error: null,
  data: null,
};

const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    on(articleActions.getArticle, (state) => ({ ...state, isLoading: true })),
    on(articleActions.getArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.article,
    })),
    on(articleActions.getArticleFailure, (state) => ({
      ...state,
      isLoading: false,
      error: 'Error on fetching article',
    })),
    on(routerNavigationAction, (state, action) => {
      const url = action.payload.routerState.url;
      const isEditArticleRoute = /^\/?editor\?slug=[^\/]+$/.test(url);
      return isEditArticleRoute ? state : initialState;
    })
  ),
});

export const {
  name: ArticleFeatureKey,
  reducer: articleReducer,
  selectData: selectArticleData,
  selectError,
  selectIsLoading,
} = articleFeature;
