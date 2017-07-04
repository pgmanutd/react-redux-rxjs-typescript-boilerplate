import * as fp from 'lodash/fp';
import { Observable } from 'rxjs';

export type projectMapT<T, R> = (value: T, index: number) => R;

export type SingleProjectionT<T, R> = projectMapT<T, R>;
export type MultiProjectionT<T, R> = (...values: T[]) => R;

const computeObservable = <T, R>(
  projection: SingleProjectionT<T, R> | MultiProjectionT<T, R>,
  observables: Array<Observable<T>>,
): Observable<R> => {
  switch (observables.length) {
    case 1:
      return observables[0]
        .map(projection as SingleProjectionT<T, R>)
        .distinctUntilChanged()
        .shareReplay(1);
    default:
      return Observable
        .combineLatest(...(observables).filter(fp.identity), projection)
        .distinctUntilChanged()
        .shareReplay(1);
  }
};

export default computeObservable;
