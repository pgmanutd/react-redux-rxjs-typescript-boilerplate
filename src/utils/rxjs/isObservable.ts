import * as fp from 'lodash/fp';

const isObservable = (value: any): boolean =>
  !!(value && fp.isFunction(value.subscribe));

export default isObservable;
