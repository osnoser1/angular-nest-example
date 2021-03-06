import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutComponent } from '@app/layouts';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: '../dashboard/dashboard.module#DashboardModule',
      },
    ],
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: 'credit-request',
        loadChildren: '../credit-request/credit-request.module#CreditRequestModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
