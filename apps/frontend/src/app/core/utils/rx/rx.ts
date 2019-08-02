import { Observable, defer, EMPTY } from 'rxjs';
import { finalize, catchError, filter, defaultIfEmpty, tap } from 'rxjs/operators';

export const prepare = <T>(callback: () => void) => (source: Observable<T>) =>
  defer(() => {
    callback();
    return source;
  });

export const indicate = <T>(indicator: { start: () => void; complete: () => void }) => (
  source: Observable<T>,
) =>
  source.pipe(
    prepare(() => indicator.start()),
    finalize(() => indicator.complete()),
  );

export const stopIfError = () => <T>(source: Observable<T>) =>
  source.pipe(
    catchError(_ => EMPTY),
    filter<T>(empty => !!empty),
  );

export const defaultIfError = <R>(value: R) => <T>(source: Observable<T>) =>
  source.pipe(
    catchError(_ => EMPTY),
    defaultIfEmpty<T, R>(value),
  );
