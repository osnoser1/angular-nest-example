import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs';

import { Todo } from '@angular-nest/data';

@Component({
  selector: 'angular-nest-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  todos: Observable<Todo[]>;

  constructor(translate: TranslateService) {
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/es|en/) ? browserLang : 'es');
  }
}
