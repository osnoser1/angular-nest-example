import { TranslateService } from '@ngx-translate/core';

export const Validation = {
  email: () => ({ email: 'VALIDATION.EMAIL' }),
  gte: (val: number) => () => ({ key: 'gte', value: 'VALIDATION.GTE', val }),
  gt: (val: number) => () => ({ key: 'gt', value: 'VALIDATION.GT', val }),
  required: () => ({ required: 'VALIDATION.REQUIRED' }),
  invalidNumber: () => ({ invalidNumber: 'VALIDATION.INVALID_NUMBER' }),
  minLength: (length: number) => () => ({
    key: 'minlength',
    value: 'VALIDATION.MIN_LENGTH',
    length,
  }),
  maxLength: (length: number) => () => ({
    key: 'maxlength',
    value: 'VALIDATION.MAX_LENGTH',
    length,
  }),
  requiredDate: () => ({ requiredDate: 'VALIDATION.REQUIRED' }),
  invalidDate: () => ({ required: 'VALIDATION.INVALID_NUMBER' }),
  minYearDiff: (years: number) => () => ({
    key: 'minYearDiff',
    value: 'VALIDATION.MIN_YEARS_DIFF',
    years,
  }),
  notFound: () => ({ notFound: 'VALIDATION.NOT_FOUND' }),
  loading: () => ({ loading: 'VALIDATION.LOADING' }),
};

const validationFunction = (
  translate: TranslateService,
  validationFunc: (() => { [key: string]: any })[],
) =>
  validationFunc.reduce((prev, curr) => {
    const { value, key, ...rest } = curr();
    const keys = Object.keys(rest);
    return {
      ...prev,
      ...(value
        ? { [key]: { msg: value, value: rest } }
        : { [keys[0]]: { msg: rest[keys[0]] } }),
    };
  }, {});

export const buildValidationMessages = (
  translate: TranslateService,
  fields: { [key: string]: (() => { [key: string]: any })[] },
) =>
  Object.keys(fields).reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: validationFunction(translate, fields[curr]),
    }),
    {},
  ) as Record<string, Record<string, { msg: string; value?: object }>>;
