declare module 'lodash/fp' {
  import * as _ from 'lodash';

  type PredT<T> = (v: T) => boolean;

  interface LoDashFPStatic extends _.LoDashStatic {
    T: typeof _.stubTrue;

    pathOr<T>(d: T, p: string, obj: _.Dictionary<T>): T | any;
    pathOr<T>(d: T, p: string): (obj: _.Dictionary<T>) => T | any;
    pathOr<T>(d: T): {
      (p: string, obj: _.Dictionary<T>): T | any;
      (p: string): (obj: _.Dictionary<T>) => T | any;
    };

    cond<T, U>(fns: Array<[PredT<T>, (v: T) => U]>): (v: T) => U;

    partition<T>(callback: _.ListIterator<T, boolean>, collection: _.List<T>): T[][];
  }

  const fp: LoDashFPStatic;
  export = fp;
}
