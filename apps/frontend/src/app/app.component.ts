import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'angular-nest-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/es|en/) ? browserLang : 'es');
  }
}
