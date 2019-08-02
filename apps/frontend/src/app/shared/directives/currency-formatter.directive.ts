import {
  Directive,
  HostListener,
  ElementRef,
  OnInit,
  Input,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NgControl } from '@angular/forms';

import { round, isNil, isFinite } from 'lodash-es';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Directive({ selector: '[appCurrencyFormatter]' })
export class CurrencyFormatterDirective
  implements OnInit, OnChanges, OnDestroy {
  @Input() locale = 'es';
  @Input() currencyCode = 'EUR';
  @Input() digitsInfo = '1.2-2';
  @Input() display = 'symbol';
  @Input() fixed? = 2;

  private currencyPipe = new CurrencyPipe(this.locale);
  private destroy$ = new Subject();
  private el: HTMLInputElement;
  private focus = false;

  constructor(private elementRef: ElementRef, private ngControl: NgControl) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.ngControl.valueChanges
      .pipe(
        filter(_ => !this.focus),
        takeUntil(this.destroy$),
      )
      .subscribe(value => {
        this.el.value = value ? this.transform(`${value}`) : '';
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.display) {
      this.el.value = this.transform(`${this.ngControl.value}`);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  @HostListener('focus')
  onFocus() {
    this.focus = true;
    const num = this.ngControl.value;
    this.el.value = `${isFinite(num) ? num : ''}`.replace('.', ',');
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    this.focus = false;
    let num = value ? Number(value.replace(',', '.')) : NaN;
    if (!isNil(this.fixed) && isFinite(num)) {
      num = round(num, this.fixed);
    }

    this.ngControl.control.setValue(isFinite(num) ? num : value);
  }

  transform(value: string) {
    const formattedValue = value.replace(',', '.');
    if (!value || (!Number(formattedValue) && formattedValue !== '0')) {
      return value;
    }

    return this.currencyPipe.transform(
      formattedValue,
      this.currencyCode,
      this.display,
      this.digitsInfo,
    );
  }
}
