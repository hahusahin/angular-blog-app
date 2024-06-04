import { createFeature, createReducer, on } from '@ngrx/store';
import { PopularTagsState } from '../types';
import { popularTagsActions } from './actions';

const initialState: PopularTagsState = {
  isLoading: false,
  data: [],
  error: null,
};

const popularTagsFeature = createFeature({
  name: 'popular-tags',
  reducer: createReducer(
    initialState,
    on(popularTagsActions.getTags, (state) => ({ ...state, isLoading: true })),
    on(popularTagsActions.getTagsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.tags,
    })),
    on(popularTagsActions.getTagsFailure, (state) => ({
      ...state,
      isLoading: false,
      error: '',
    }))
  ),
});

export const {
  name: PopularTagsFeatureKey,
  reducer: popularTagsReducer,
  selectData: selectTagsData,
  selectError: selectTagsError,
  selectIsLoading: selectTagsIsLoading,
} = popularTagsFeature;
