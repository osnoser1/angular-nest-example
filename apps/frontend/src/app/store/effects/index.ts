import { AppEffects } from './app.effects';
import { RouterEffects } from './router.effects';

export const effects: any[] = [RouterEffects, AppEffects];

export * from './app.effects';
