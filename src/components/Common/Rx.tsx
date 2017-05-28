import * as fp from 'lodash/fp';
import * as React from 'react';

import {
  isObservable,
  Observable,
  Subscription
} from '@webui/utils/rxjs';

export type RxProps<T> = {
  [K in keyof T]: T[K] | Observable<T[K]>;
};

export type NoOpT = (() => void);

export type ReactComponentT<P> = React.ComponentClass<P> | React.StatelessComponent<P>;

export function getRxDisplayName<P>(tag: string | NoOpT | ReactComponentT<P>): string {
  const prefix: string = 'Reactive';

  return fp.cond([
    [
      fp.isString,
      fp.constant(`${prefix}(${tag})`)
    ],
    [
      fp.isFunction,
      fp.constant(`${prefix}(${(tag as NoOpT).name})`)
    ],
    [
      fp.T,
      fp.constant(prefix)
    ]
  ])(tag);
}

export function DefaultComponent<P>(props: P): JSX.Element {
  return <span {...props} />;
}

export default function Rx<P>(
  Component: ReactComponentT<P> = DefaultComponent
): React.ComponentClass<RxProps<P>> {

  return class ReactiveComponent extends React.Component<RxProps<P>, {}> {
    static displayName: string = getRxDisplayName(Component);
    subscriptions: Subscription[];

    constructor(props: RxProps<P>) {
      super(props);

      this.state = {};
      this.subscriptions = [];
    }

    componentWillMount() {
      this.subscribe(this.props);
    }

    componentWillReceiveProps(props: RxProps<P>) {
      this.subscribe(props);
    }

    componentWillUnmount() {
      this.unsubscribe(this.subscriptions);
    }

    subscribe(props: RxProps<P>) {
      const oldSubscriptions = this.subscriptions;

      const [propPairs$, propPairs] = fp.partition(
        ([, value]) => isObservable(value),
        fp.toPairs(props)
      );

      propPairs.forEach(([name, value]) => {
        this.setStateFromProps(name, value);
      });

      this.subscriptions = propPairs$.map(([name, value]) => {
        return value.subscribe({
          next: (val: any) => {
            this.setStateFromProps(name, val);
          }
        });
      });

      this.unsubscribe(oldSubscriptions);
    }

    setStateFromProps(name: string, value: any) {
      if (fp.negate(fp.isEqual)(value, this.state[name])) {
        this.setState({
          [name]: value
        });
      }
    }

    unsubscribe(subscriptions: Subscription[]) {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    render() {
      return <Component {...this.state} />;
    }
  };
}
