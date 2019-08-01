import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static gte(value: number) {
    return (control: AbstractControl) => {
      const v = +control.value;
      return v >= +value ? null : { gte: { value } };
    };
  }

  static gt(value: number | AbstractControl) {
    const val = typeof value === 'number' ? value : value.value;
    return (control: AbstractControl) => {
      const v = control.value;
      return v > val ? null : { gt: { value: val } };
    };
  }

  static lt(value: number | AbstractControl) {
    const val = typeof value === 'number' ? value : value.value;
    return (control: AbstractControl) => {
      const v = control.value;
      return v < val ? null : { lt: { value: val } };
    };
  }

  // Number only validation
  static numeric(float = true) {
    return (control: AbstractControl) => {
      return typeof control.value !== 'number' ||
        (!float && Math.trunc(control.value) !== control.value)
        ? { invalidNumber: true }
        : null;
    };
  }

  static different(value: number): ValidatorFn {
    return (control: AbstractControl) =>
      value === Number(control.value) ? { different: true } : null;
  }

  static requiredDate(control: AbstractControl) {
    const nativeElement = (control as any).nativeElement;
    return !control.value && nativeElement && !nativeElement.value ? { requiredDate: true } : null;
  }
}