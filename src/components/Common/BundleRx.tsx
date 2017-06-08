import * as clogy from 'clogy';
import * as fp from 'lodash/fp';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  computeObservable,
  Observable,
  observableFromPromise,
  observableOf
} from '@webui/utils/rxjs';

import purify from './purify';
import Rx, { ReactComponentT } from './Rx';

// NOTE: Why <T extends {}> => https://basarat.gitbooks.io/typescript/docs/types/generics.html
export const getBundle$ = <T extends {}>(promisifiedBundle: Promise<T>) => {
  try {
    return observableFromPromise<T>(promisifiedBundle);
  } catch (e) {
    clogy.error(`Can't load bundle`, e);
  }

  return observableOf(null);
};

export const BundleComponent: ReactComponentT<{}> = (props) => {
  const Bundle = props.children as ReactComponentT<{}>;

  if (Bundle) {
    return <Bundle />;
  }

  // NOTE: Should be null. Some problem with React Type definitions.
  // https://github.com/facebook/react/issues/5355
  return <noscript />;
};
BundleComponent.propTypes = {
  children: PropTypes.func
};

export const PurifiedBundleRxComponent = fp.flowRight(Rx, purify)(BundleComponent);

export const getModuleFromBundle$ = <T1, T2>(bundle$: Observable<T1>) =>
  computeObservable<T1, T2>(
    (module: T1 & KeyValuePair) => fp.pathOr(module, 'default', module), [
      bundle$
    ]
  );

export type PromiseThunkT = <T>() => Promise<T>;
export type BundleRXComponentT = () => JSX.Element;
export type BundleRx$T = (getPromisifiedBundle: PromiseThunkT) => BundleRXComponentT;
const BundleRx: BundleRx$T = (getPromisifiedBundle) => () =>
  <PurifiedBundleRxComponent>
    {
      fp.flowRight(getModuleFromBundle$, getBundle$, getPromisifiedBundle)()
    }
  </PurifiedBundleRxComponent>;

export default BundleRx;
