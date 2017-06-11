import * as fp from 'lodash/fp';
import { Observable } from 'rxjs';

const getObservableValue = <T, FallbackValue>(input: Observable<T>, fallback: FallbackValue): (T | FallbackValue) => {
  let value: any;

  input.subscribe({
    next(val: any) {
      value = val;
    },
  }).unsubscribe();

  if (fp.isUndefined(value)) {
    return fallback;
  }

  return value;
};

export default getObservableValue;
