import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '@app/material';
import { MessageDialogComponent } from './dialogs';
import {
  ProgressButtonDirective,
  CurrencyFormatterDirective,
} from './directives';
import { SanitizeHtmlPipe } from './pipes';
import { NotificationService } from './services';

@NgModule({
  declarations: [
    MessageDialogComponent,
    ProgressButtonDirective,
    SanitizeHtmlPipe,
    CurrencyFormatterDirective,
  ],
  entryComponents: [MessageDialogComponent],
  exports: [
    CommonModule,
    CurrencyFormatterDirective,
    MaterialModule,
    ProgressButtonDirective,
    SanitizeHtmlPipe,
    TranslateModule,
  ],
  imports: [CommonModule, MaterialModule, TranslateModule],
  providers: [NotificationService],
})
export class SharedModule {}
