import { AppEffects } from './app.effects';
import { GlobalErrorEffects } from './global-error.effects';
import { RouterEffects } from './router.effects';

export const effects: any[] = [RouterEffects, AppEffects, GlobalErrorEffects];

export * from './app.effects';
export * from './global-error.effects';
