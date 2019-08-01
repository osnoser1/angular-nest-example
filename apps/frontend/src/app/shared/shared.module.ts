import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '@app/material';

@NgModule({
  declarations: [],
  exports: [CommonModule, MaterialModule, TranslateModule],
  imports: [CommonModule],
})
export class SharedModule {}
