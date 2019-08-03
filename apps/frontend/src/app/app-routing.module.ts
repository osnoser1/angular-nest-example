import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedGuard } from './protected.guard';

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
    canActivate: [ProtectedGuard],
    canActivateChild: [ProtectedGuard],
  },
  {
    path: 'session',
    loadChildren: './session/session.module#SessionModule',
    canActivate: [ProtectedGuard],
    canActivateChild: [ProtectedGuard],
  },
  { path: '**', redirectTo: 'session/signup' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
