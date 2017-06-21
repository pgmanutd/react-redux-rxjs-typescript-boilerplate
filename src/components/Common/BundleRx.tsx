import * as clogy from 'clogy';
import * as fp from 'lodash/fp';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  computeObservable,
  delayedObservable,
  Observable,
  observableFromPromise,
  observableOf,
} from '@webui/utils/rxjs';

import purify from './purify';
import Rx, { ReactComponentT } from './Rx';

export interface BundleComponentProps<T> {
  children: ReactComponentT<T>;
  LoadingComponent: React.ReactElement<T>;
}
export const BundleComponent: React.StatelessComponent<BundleComponentProps<{}>> = (props) => {
  const { children, LoadingComponent } = props;
  const Bundle = children as ReactComponentT<{}>;

  if (fp.isFunction(Bundle)) {
    return <Bundle />;
  }

  return LoadingComponent;
};
BundleComponent.propTypes = {
  children: PropTypes.func,
  LoadingComponent: PropTypes.element,
};

export const PurifiedBundleRxComponent = fp.flowRight(Rx, purify)(BundleComponent);

export const getModuleFromBundle$ = <T1, T2>(bundle$: Observable<T1>) =>
  computeObservable<T1, T2>(
    (module: T1 & KeyValuePair) => fp.pathOr(module, 'default', module), [
      bundle$,
    ],
  );

// NOTE: Why <T extends {}> => https://basarat.gitbooks.io/typescript/docs/types/generics.html
export const getBundle$ = <T extends {}>(loader: Promise<T>) => {
  try {
    return observableFromPromise<T>(loader);
  } catch (e) {
    clogy.error(`Can't load bundle`, e);
  }

  return observableOf(null);
};

export type PromiseThunkT = <T>() => Promise<T>;
export type BundleRXComponentT = () => JSX.Element;
export interface BundleRxArgs<T = {}> {
  loader: PromiseThunkT;
  LoadingComponent?: React.ReactElement<T>;
  delay?: number;
}
const BundleRx = ({
  loader,
  LoadingComponent = null,
  delay = 0,
}: BundleRxArgs): BundleRXComponentT => () => {
  const getBundleFromLoader$ =  () => fp.flowRight(getModuleFromBundle$, getBundle$, loader)();

  return (
    <PurifiedBundleRxComponent LoadingComponent={LoadingComponent}>
      {
        delayedObservable(delay, getBundleFromLoader$)
      }
    </PurifiedBundleRxComponent>
  );
};

export default BundleRx;
