import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Store } from '@ngrx/store';

import { State, loadUserFromLocalStorage } from './store';

@Component({
  selector: 'angular-nest-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  constructor(private store: Store<State>, translate: TranslateService) {
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/es|en/) ? browserLang : 'es');

    this.store.dispatch(loadUserFromLocalStorage());
  }
}
