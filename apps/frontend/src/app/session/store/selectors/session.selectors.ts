import { createSelector } from '@ngrx/store';

import { getSessionFeatureState } from '../reducers';

export const getActivitySheetState = createSelector(
  getSessionFeatureState,
  state => state.session,
);

export const getLoadingState = createSelector(
  getActivitySheetState,
  state => state.loading,
);

export const getResetFormState = createSelector(
  getActivitySheetState,
  state => state.resetForm,
);
