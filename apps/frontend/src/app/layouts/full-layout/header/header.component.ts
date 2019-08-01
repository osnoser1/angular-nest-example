import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import * as screenfull from 'screenfull';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private router: Router) {}

  logout() {}

  fullScreenToggle(): void {
    if ((screenfull as any).enabled) {
      (screenfull as any).toggle();
    }
  }
}
