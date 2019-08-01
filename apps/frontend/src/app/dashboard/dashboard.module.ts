import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
