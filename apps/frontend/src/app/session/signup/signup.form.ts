import { Injectable, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';

import { Observable, of, Subject } from 'rxjs';
import {
  tap,
  debounceTime,
  distinctUntilChanged,
  concatMap,
  catchError,
  map,
  skip,
  filter,
  takeUntil,
} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { User } from '@angular-nest/data';
import {
  CustomForm,
  Validation,
  buildValidationMessages,
  CustomValidators,
} from '@app/shared';
import { UserService } from '@app/core/services';

@Injectable()
export class SignupForm extends CustomForm implements OnDestroy {
  group!: FormGroup;

  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private userService: UserService,
  ) {
    super();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  initialize(): void {
    const document = this.fb.control(undefined, [
      Validators.required,
      CustomValidators.numeric(false),
    ]);

    this.addDocumentSearchLogic(document, this.userService);

    this.group = this.fb.group({
      document,
      name: [undefined, Validators.required],
      lastName: [undefined, Validators.required],
      birthDate: [undefined, [Validators.required, this.minYearDiff(18)]],
    });

    this.messages = buildValidationMessages(this.translate, {
      document: [
        Validation.required,
        Validation.invalidNumber,
        Validation.notFound,
        Validation.loading,
      ],
      name: [Validation.required],
      lastName: [Validation.required],
      birthDate: [Validation.required, Validation.minYearDiff(18)],
    });
  }

  inverseMap = () => {
    const user = this.group.value as User;
    return { ...user, document: Number(user.document) } as User;
  };

  private minYearDiff(years: number) {
    return (control: AbstractControl) =>
      control.value &&
      new Date().getFullYear() - (control.value as Date).getFullYear() >= years
        ? null
        : { minYearDiff: true };
  }

  private addDocumentSearchLogic(
    document: AbstractControl,
    userService: UserService,
  ) {
    document.valueChanges
      .pipe(
        filter(v => !!v),
        tap(v => !!v && document.setErrors({ loading: true })),
        this.document(userService),
        takeUntil(this.destroy$),
      )
      .subscribe(r => {
        document.setErrors(r.error);
        this._ref.markForCheck();
      });
  }

  private document(userService: UserService) {
    return (
      source: Observable<string>,
    ): Observable<{
      result: User | null;
      error: { notFound: boolean } | null;
    }> =>
      source.pipe(
        debounceTime(300),
        distinctUntilChanged<string>(),
        concatMap(document =>
          userService.getByDocument(document).pipe(
            map(v => ({ result: v, error: { notFound: true } })),
            catchError(_err => of({ result: null, error: null })),
          ),
        ),
      );
  }
}
