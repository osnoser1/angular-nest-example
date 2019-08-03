import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { format, startOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { omitBy, isNil } from 'lodash-es';

import {
  CustomForm,
  Validation,
  buildValidationMessages,
  CustomValidators,
} from '@app/shared';
import { CreditRequest } from '@angular-nest/data';

@Injectable()
export class CreditCardForm extends CustomForm implements OnDestroy {
  group!: FormGroup;

  private destroy$ = new Subject();

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    super();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  map(creditRequest: Readonly<Partial<CreditRequest>>) {
    this.destroy$.next();

    const group = this.fb.group({
      companyName: [creditRequest.companyName, Validators.required],
      companyNit: [
        creditRequest.companyNit,
        [Validators.required, CustomValidators.numeric(false)],
      ],
      salary: [
        creditRequest.salary,
        [
          Validators.required,
          CustomValidators.numeric(false),
          CustomValidators.gte(0),
          CustomValidators.lt(100000000),
        ],
      ],
      startDate: [
        creditRequest.salary && new Date(creditRequest.salary),
        [Validators.required, CustomValidators.maxDate(startOfDay(new Date()))],
      ],
    });

    this.group = group;

    this.messages = buildValidationMessages(this.translate, {
      companyName: [Validation.required],
      companyNit: [Validation.required, Validation.invalidNumber],
      salary: [
        Validation.required,
        Validation.invalidNumber,
        Validation.gte(0),
        Validation.lt(100000000),
      ],
      startDate: [Validation.required, Validation.maxDate],
    });
  }
  inverseMap = () => {
    const value = this.group.value;
    const creditRequest: CreditRequest = {
      ...value,
      startDate: `${format(value.startDate, 'YYYY-MM-DD')}T00:00:00`,
    };

    return {
      creditRequest: omitBy(creditRequest, isNil) as CreditRequest,
    };
  };
}
