import { createAction, props } from '@ngrx/store';

import { User } from '@angular-nest/data';

export const loadUser = createAction(
  '[App] Load User',
  props<{ user: User }>(),
);

export const loadUserFromLocalStorage = createAction(
  '[App] Load User From Local Storage',
);

export const removeUser = createAction('[App] Remove User');
