import { FormGroup, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

export abstract class CustomForm {
  cascadeValidation = true;
  abstract group: FormGroup;
  messages: Record<string, Record<string, { msg: string; value?: object }>> = {};

  set ref(value: ChangeDetectorRef) {
    this._ref = value;
  }

  // tslint:disable-next-line: variable-name
  protected _ref?: ChangeDetectorRef;

  enable(...controlNames: string[]) {
    controlNames.forEach(n => {
      if (this.group.controls[n]) {
        this.group.controls[n].enable();
      } else {
        console.error(`Cant find control with key: ${n}`);
      }
    });
  }

  getErrors(controlName: string, control?: AbstractControl) {
    control = control || this.group.get(controlName);
    return (
      (control &&
        !control.valid &&
        (control.touched || !control.pristine) &&
        Object.keys(control.errors || {}).reduce(
          (list, key, i) =>
            (this.cascadeValidation && i > 0 && list) || [...list, this.messages[controlName][key]],
          [] as { msg: string; value?: object }[],
        )) ||
      []
    );
  }

  getValue(controlName: string) {
    const control = this.group.get(controlName);
    return control && control.value;
  }

  hasErrors(controlName: string) {
    const control = this.group.get(controlName);
    return control && !control.valid && (control.touched || !control.pristine);
  }

  updateValueAndValidity(control?: AbstractControl) {
    control = control || this.group;
    control.updateValueAndValidity();
    this.markAsTouched([control]);

    if (this._ref) {
      this._ref.markForCheck();
    }
  }

  markAsTouched(controls: AbstractControl[]): any {
    controls.forEach(element => {
      if (element instanceof FormControl) {
        element.markAsTouched();
      } else if (element instanceof FormArray) {
        element.markAsTouched();
        this.markAsTouched(element.controls);
      } else if (element instanceof FormGroup) {
        this.markAsTouched(Object.values(element.controls));
      }
    });
  }

  isValid(controlName?: string, control?: AbstractControl) {
    control = control || this.group.get(controlName);
    return control
      ? control.valid && (control.touched || !control.pristine)
      : this.group.valid || this.group.disabled;
  }

  disabled(controlName: string) {
    return this.group.controls[controlName].disabled;
  }
}
