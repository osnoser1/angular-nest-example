import { InjectionToken } from '@angular/core';
import {
  Params,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

import * as fromRouter from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
  Action,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '@env/environment';
import * as fromError from './global-error.reducer';
import * as fromApp from './app.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  app: fromApp.AppState;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  errors: fromError.ErrorState;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    app: fromApp.appReducer,
    routerReducer: fromRouter.routerReducer,
    errors: fromError.reducer,
  }),
});

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

export const getErrorsState = createFeatureSelector<fromError.ErrorState>(
  'errors',
);

export const getAppState = createFeatureSelector<fromApp.AppState>('app');

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}

export function freezer(reducer: ActionReducer<any>): ActionReducer<any> {
  const exclusions: RegExp[] = [/^@ngrx\/router-store\//, /^\[Router\]/];

  function hasActivatedRoute(action: Action) {
    return (
      !!((action as any).payload && (action as any).payload.route) || false
    );
  }

  return (state: any, action: Action): any => {
    const excluded = exclusions.reduce((current, next) => {
      const isExcluded =
        Boolean(action.type.match(next)) || hasActivatedRoute(action);
      return current || isExcluded;
    }, false);

    if (excluded) {
      return reducer(state, action);
    }

    return storeFreeze(reducer)(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [freezer]
  : [];

export function actionSanitizer(
  action: { type: string; payload?: any },
  id: number,
): Action {
  return action.payload &&
    (action.type === '[Router] Go' || action.payload.route)
    ? { ...action, payload: '<<LONG_BLOB>>' }
    : action;
}
