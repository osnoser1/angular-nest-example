import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';

import { Subject } from 'rxjs';

import { CreditCardForm } from './credit-card.form';
import { NotificationService } from '@app/shared/services';
import { Store } from '@ngrx/store';
import { requestCredit } from '../store/actions';

@Component({
  selector: 'angular-nest-credit-request-form',
  templateUrl: './credit-request-form.component.html',
  styleUrls: ['./credit-request-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreditCardForm],
})
export class CreditRequestFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  constructor(
    public form: CreditCardForm,
    private ref: ChangeDetectorRef,
    private notification: NotificationService,
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.form.ref = this.ref;
    this.form.map({});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onSubmit() {
    this.form.updateValueAndValidity();
    if (!this.form.isValid()) {
      this.notification.showMessage('MESSAGES.INVALID_FORM');
      return;
    }

    const value = this.form.inverseMap();
    this.store.dispatch(requestCredit(value));
  }
}
