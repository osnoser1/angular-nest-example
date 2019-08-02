import { createAction, props } from '@ngrx/store';

import { User } from '@angular-nest/data';

export const registerUser = createAction(
  '[Session] Register User',
  props<{ user: User }>(),
);

export const registerUserSuccess = createAction(
  '[Session] Register User Success',
  props<{ user: User }>(),
);

export const resetForm = createAction(
  '[Session] Reset Form',
  props<{ reset: boolean }>(),
);
