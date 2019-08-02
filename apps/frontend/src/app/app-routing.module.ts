import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'private/dashboard',
    pathMatch: 'prefix',
  },
  {
    path: 'private',
    data: {
      title: 'DASHBOARD.NAME',
    },
    loadChildren: './private/private.module#PrivateModule',
  },
  {
    path: 'session',
    loadChildren: './session/session.module#SessionModule',
  },
  { path: '**', redirectTo: 'private/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
