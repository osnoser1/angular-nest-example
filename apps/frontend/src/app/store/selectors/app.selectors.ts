import { createSelector } from '@ngrx/store';

import { getAppState } from '../reducers';

export const getUserState = createSelector(
  getAppState,
  state => state.user,
);
