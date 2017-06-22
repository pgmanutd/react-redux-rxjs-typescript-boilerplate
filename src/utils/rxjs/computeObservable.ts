import * as fp from 'lodash/fp';
import { Observable } from 'rxjs';

export type SingleProjectionT = typeof Array.prototype.map;
export type MultiProjectionT = <T, R>(...values: T[]) => R;

const computeObservable = <T, R>(
  projection: SingleProjectionT | MultiProjectionT,
  observables: Array<Observable<T>>,
): Observable<R> => {
  switch (observables.length) {
    case 1:
      return observables[0]
        .map(projection)
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
