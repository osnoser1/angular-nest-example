import { Injectable } from '@angular/core';
import { UserService } from '@app/core/services';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { registerUser, registerUserSuccess, resetForm } from '../actions';
import { map, tap, exhaustMap } from 'rxjs/operators';
import { NotificationService } from '@app/shared/services';

@Injectable()
export class SessionEffects {
  @Effect() registerUser$ = this.actions.pipe(
    ofType(registerUser),
    exhaustMap(({ user }) => this.userService.register(user)),
    map(user => registerUserSuccess({ user })),
  );

  @Effect() registerUserSuccess$ = this.actions.pipe(
    ofType(registerUserSuccess),
    tap(_ => this.notification.showMessage('MESSAGES.REGISTER_ADDED')),
    map(_ => resetForm({ reset: true })),
  );

  constructor(
    private actions: Actions,
    private notification: NotificationService,
    private userService: UserService,
  ) {}
}
