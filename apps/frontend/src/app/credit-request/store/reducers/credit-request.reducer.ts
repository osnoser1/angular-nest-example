import { createReducer, on } from '@ngrx/store';

import { CreditRequest } from '@angular-nest/data';

import * as fromCreditRequest from '../actions/credit-request.actions';

export interface CreditRequestState {
  loading: boolean;
}

export const creditRequestState: CreditRequestState = {
  loading: false,
};

export const creditRequestReducer = createReducer<CreditRequestState>(
  creditRequestState,
);
