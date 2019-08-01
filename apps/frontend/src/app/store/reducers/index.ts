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

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    routerReducer: fromRouter.routerReducer,
  }),
});

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

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
