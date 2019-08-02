import { createReducer, on } from '@ngrx/store';

import { User } from '@angular-nest/data';

import * as fromSession from '../actions/session.actions';

export interface SessionState {
  loading: boolean;
  resetForm: boolean;
  user?: User;
}

export const sessionState: SessionState = {
  loading: false,
  resetForm: false,
};

export const sessionReducer = createReducer<SessionState>(
  sessionState,
  on(fromSession.registerUser, state => ({
    ...state,
    loading: true,
    resetForm: false,
  })),
  on(fromSession.registerUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(fromSession.resetForm, (state, { reset }) => ({
    ...state,
    resetForm: reset,
  })),
);
