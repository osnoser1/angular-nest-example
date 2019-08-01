import { NgModule } from '@angular/core';

import { LayoutsModule } from '@app/layouts';
import { PrivateRoutingModule } from './private-routing.module';

@NgModule({
  declarations: [],
  imports: [PrivateRoutingModule, LayoutsModule],
})
export class PrivateModule {}
