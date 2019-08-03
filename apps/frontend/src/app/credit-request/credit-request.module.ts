import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CreditRequestRoutingModule } from './credit-request-routing.module';
import { CreditRequestFormComponent } from './credit-request-form';
import { SharedModule } from '@app/shared';
import { ROOT_REDUCERS } from './store/reducers';
import { effects } from './store/effects';

@NgModule({
  declarations: [CreditRequestFormComponent],
  imports: [
    CommonModule,
    CreditRequestRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('creditRequest', ROOT_REDUCERS),
    EffectsModule.forFeature(effects),
    SharedModule,
  ],
})
export class CreditRequestModule {}
