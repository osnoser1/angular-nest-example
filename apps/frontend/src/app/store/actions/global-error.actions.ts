import { createAction, props } from '@ngrx/store';

export const addGlobalError = createAction(
  '[GlobalError] Add Global Error',
  props<{ error: any }>(),
);
