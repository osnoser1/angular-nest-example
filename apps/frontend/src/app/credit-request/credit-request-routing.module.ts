import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditRequestFormComponent } from './credit-request-form';

const routes: Routes = [
  { path: 'new', component: CreditRequestFormComponent },
  { path: '', redirectTo: 'new', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditRequestRoutingModule {}
