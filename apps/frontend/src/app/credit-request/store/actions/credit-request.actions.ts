import { createAction, props } from '@ngrx/store';

import { CreditRequest, CreditRequestResponse } from '@angular-nest/data';

export const requestCredit = createAction(
  '[CreditRequest] Request Credit',
  props<{ creditRequest: CreditRequest }>(),
);

export const requestCreditSuccess = createAction(
  '[CreditRequest] Request Credit Success',
  props<{ result: CreditRequestResponse }>(),
);
