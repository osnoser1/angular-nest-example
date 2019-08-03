import { createReducer, on } from '@ngrx/store';

import { User } from '@angular-nest/data';

import * as fromApp from '../actions/app.actions';
import { omit } from 'lodash-es';

export interface AppState {
  user?: User;
}

export const appState: AppState = {};

export const appReducer = createReducer<AppState>(
  appState,
  on(fromApp.loadUser, (state, { user }) =>
    user
      ? {
          ...state,
          user,
        }
      : state,
  ),
  on(fromApp.removeUser, state => ({
    ...omit(state, 'user'),
  })),
);
