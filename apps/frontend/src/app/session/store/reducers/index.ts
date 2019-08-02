import { Action, ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { sessionReducer, SessionState } from './session.reducer';
import { InjectionToken } from '@angular/core';

export interface SessionFeatureState {
  session: SessionState;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<SessionFeatureState, Action>
>('SessionFeatureState reducers token', {
  factory: () => ({
    session: sessionReducer,
  }),
});

export const getSessionFeatureState = createFeatureSelector<
  SessionFeatureState
>('session');

export * from './session.reducer';
