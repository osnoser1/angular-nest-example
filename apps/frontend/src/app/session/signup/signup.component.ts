import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';

import { NotificationService } from '@app/shared/services';
import { SignupForm } from './signup.form';
import {
  SessionFeatureState,
  getLoadingState,
  getResetFormState,
} from '../store';
import { registerUser } from '../store/actions';
import { filter, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SignupForm],
})
export class SignupComponent implements OnInit, OnDestroy, AfterViewInit {
  loading$: Observable<boolean>;

  private destroy$ = new Subject();

  constructor(
    public form: SignupForm,
    private notification: NotificationService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private store: Store<SessionFeatureState>,
    private translate: TranslateService,
  ) {
    this.form.ref = ref;
  }

  ngOnInit() {
    this.loading$ = this.store.pipe(select(getLoadingState));
    this.form.initialize();

    const resetForm = this.store.pipe(
      select(getResetFormState),
      filter(reset => reset),
      takeUntil(this.destroy$),
    );

    resetForm.subscribe(_ => {
      this.form.initialize();
      this.ref.markForCheck();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.form.group.reset(), 100);
  }

  onSubmit() {
    this.form.updateValueAndValidity();
    if (!this.form.isValid()) {
      this.notification.showMessage('MESSAGES.INVALID_FORM');
      return;
    }

    const user = this.form.inverseMap();
    this.store.dispatch(registerUser({ user }));
  }

  private async onSuccess(result: Record<string, any>) {
    await this.router.navigate(['/private/dashboard']);
    this.notification.showMessage(
      this.translate.instant('MESSAGES.LOGIN_SUCCESS'),
    );
  }
}
