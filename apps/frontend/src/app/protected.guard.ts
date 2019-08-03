import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { State } from './store';
import { getUserState } from './store/selectors';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProtectedGuard implements CanActivate, CanActivateChild {
  private readonly publicUrl = '/session/signup';
  private readonly protectedUrl = '';

  constructor(private router: Router, private store: Store<State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.validate(state);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.validate(state);
  }

  private validate(state: RouterStateSnapshot) {
    return of({}).pipe(
      withLatestFrom(this.store.pipe(select(getUserState))),
      map(([_, user]) => {
        if (state.url === this.publicUrl && user) {
          this.router.navigateByUrl(this.protectedUrl);
          return false;
        }

        if (state.url !== this.publicUrl && !user) {
          this.router.navigateByUrl(this.publicUrl);
          return false;
        }

        return true;
      }),
    );
  }
}
