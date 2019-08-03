import { Injectable } from '@angular/core';

import { map, tap, exhaustMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { UserService } from '@app/core/services';
import { requestCredit, requestCreditSuccess } from '../actions';
import { NotificationService } from '@app/shared/services';
import { CreditRequestFeatureState } from '../reducers';
import { getUserState } from '@app/store/selectors/app.selectors';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CreditRequestEffects {
  @Effect() requestCredit$ = this.actions.pipe(
    ofType(requestCredit),
    withLatestFrom(this.store.select(getUserState)),
    exhaustMap(([{ creditRequest }, user]) =>
      this.userService.requestCreditByDocument(user.document, creditRequest),
    ),
    map(result => requestCreditSuccess({ result })),
  );

  @Effect({ dispatch: false }) requestCreditSuccess$ = this.actions.pipe(
    ofType(requestCreditSuccess),
    tap(({ result }) =>
      this.notification.showMessageDialog(
        'MESSAGES.RESULT',
        !result.approved
          ? result.reason
          : this.translate.instant('CREDIT_REQUEST_FORM.APPROVED_MSG', {
              val: result.amountApproved,
            }),
      ),
    ),
  );

  constructor(
    private actions: Actions,
    private notification: NotificationService,
    private userService: UserService,
    private store: Store<CreditRequestFeatureState>,
    private translate: TranslateService,
  ) {}
}
