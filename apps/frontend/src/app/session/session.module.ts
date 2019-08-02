import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LayoutsModule } from '@app/layouts';
import { SharedModule } from '@app/shared';
import { SessionRoutingModule } from './session-routing.module';
import { SignupComponent } from './signup/signup.component';
import { effects, ROOT_REDUCERS } from './store';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    SessionRoutingModule,
    ReactiveFormsModule,
    LayoutsModule,
    StoreModule.forFeature('session', ROOT_REDUCERS),
    EffectsModule.forFeature(effects),
    SharedModule,
  ],
})
export class SessionModule {}
