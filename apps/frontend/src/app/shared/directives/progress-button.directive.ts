import {
  Directive,
  ElementRef,
  Renderer2,
  HostBinding,
  HostListener,
  Input,
  ChangeDetectorRef,
} from '@angular/core';

@Directive({
  selector: '[appProgressButton]',
})
export class ProgressButtonDirective {
  @HostBinding('class.active') active = false;

  @Input()
  set appProgressButton(value: boolean) {
    this.active = value;
    this.ref.markForCheck();
  }

  constructor(private el: ElementRef, private ref: ChangeDetectorRef, private renderer: Renderer2) {
    this.renderer.addClass(this.el.nativeElement, 'app-progress-button');
  }
}
