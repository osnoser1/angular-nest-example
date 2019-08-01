import {
  ValidationError,
  isValidationError,
  isProblemDetailsError,
} from '@app/core/models';

import { union } from '@ngrx/store';

import * as fromGlobalErrorActions from '../actions';

const all = union(fromGlobalErrorActions);
type GlobalErrorActions = typeof all;

// tslint:disable-next-line:no-empty-interface
export interface ErrorState extends ValidationError {}

const initialState: ErrorState = {
  status: -1,
  title: '',
  'invalid-params': [],
};

export function reducer(
  state = initialState,
  action: GlobalErrorActions,
): ErrorState {
  switch (action.type) {
    case fromGlobalErrorActions.addGlobalError.type:
      return isValidationError(action.error) ||
        isProblemDetailsError(action.error)
        ? {
            ...state,
            ...action.error,
          }
        : { ...state, detail: action.error };

    default:
      return state;
  }
}
