import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { isNil } from 'lodash-es';

import * as fromGlobalErrorActions from '../actions/global-error.actions';
import {
  isValidationError,
  ValidationError,
  ProblemDetails,
  isProblemDetailsError,
} from '@app/core/models';

@Injectable()
export class GlobalErrorEffects {
  @Effect({ dispatch: false })
  addGlobalError$ = this.actions$.pipe(
    ofType(fromGlobalErrorActions.addGlobalError),
    tap(({ error }: { error: ValidationError | ProblemDetails }) => {
      let message = 'MESSAGES.ERROR';
      if (isValidationError(error)) {
        const modelError = error['invalid-params'].find(e => isNil(e.name));
        if (modelError) {
          message = modelError.reason;
        }
      } else if (isProblemDetailsError(error)) {
        message = error.title;
      }

      return this.snackBar.open(this.translate.instant(message), undefined, { duration: 3000 });
    }),
  );

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {}
}
