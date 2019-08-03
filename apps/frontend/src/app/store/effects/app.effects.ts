import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { tap, map } from 'rxjs/operators';

import { loadUserFromLocalStorage, loadUser, removeUser } from '../actions';
import { User } from '@angular-nest/data';

@Injectable()
export class AppEffects {
  @Effect() loadUserFromLocalStorage$ = this.actions.pipe(
    ofType(loadUserFromLocalStorage),
    map(() =>
      loadUser({ user: JSON.parse(localStorage.getItem('user')) as User }),
    ),
  );

  @Effect({ dispatch: false }) loadUser$ = this.actions.pipe(
    ofType(loadUser),
    tap(
      ({ user }) => user && localStorage.setItem('user', JSON.stringify(user)),
    ),
  );

  @Effect({ dispatch: false }) removeUser$ = this.actions.pipe(
    ofType(removeUser),
    tap(() => localStorage.removeItem('user')),
  );

  constructor(private actions: Actions) {}
}
