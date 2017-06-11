import * as React from 'react';

import { ReactComponentT } from './Rx';

export default function purify<P>(
  Component: ReactComponentT<P>,
): React.ComponentClass<P> {
  return class PureComponent extends React.PureComponent<P, {}> {
    static displayName: string = `PureComponent(${Component.name})`;

    render() {
      return <Component {...this.props} />;
    }
  };
}
