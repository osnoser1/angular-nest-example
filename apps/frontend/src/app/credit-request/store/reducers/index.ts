import { Action, ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import {
  creditRequestReducer,
  CreditRequestState,
} from './credit-request.reducer';
import { InjectionToken } from '@angular/core';

export interface CreditRequestFeatureState {
  creditRequest: CreditRequestState;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<CreditRequestFeatureState, Action>
>('CreditRequestFeatureState reducers token', {
  factory: () => ({
    creditRequest: creditRequestReducer,
  }),
});

export const getCreditRequestFeatureState = createFeatureSelector<
  CreditRequestFeatureState
>('creditRequest');

export * from './credit-request.reducer';
