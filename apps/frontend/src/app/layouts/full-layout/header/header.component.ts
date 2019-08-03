import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import * as screenfull from 'screenfull';
import { Store } from '@ngrx/store';

import { State, removeUser, go } from '@app/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private router: Router, private store: Store<State>) {}

  logout() {
    this.store.dispatch(removeUser());
    this.store.dispatch(go({ path: ['/session/signup'] }));
  }

  fullScreenToggle(): void {
    if ((screenfull as any).enabled) {
      (screenfull as any).toggle();
    }
  }
}
