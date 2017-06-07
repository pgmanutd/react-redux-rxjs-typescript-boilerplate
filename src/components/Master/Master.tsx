import * as classnames from 'classnames';
import * as clogy from 'clogy';
import * as fp from 'lodash/fp';
import * as React from 'react';
import {
  Link,
  Route,
  Switch
} from 'react-router-dom';

import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

import {
  purify,
  ReactComponentT,
  Rx
} from '@webui/components/Common';
import {
  Observable,
  observableFromPromise,
  observableOf
} from '@webui/utils/rxjs';

const {
  dFlex,
  flexColumn,
  nav,
  navbar,
  navbarBrand,
  navbarNav,
  navItem,
  active,
  container
} = bootstrap;

type GetLayoutFile$T = (promisifiedLayoutFile: Promise<any>) => Observable<any>;
export const getLayoutFile$: GetLayoutFile$T = (promisifiedLayoutFile) => {
  try {
    return observableFromPromise<any>(promisifiedLayoutFile);
  } catch (e) {
    clogy.error(`Can't load layout file`, e);
  }

  return observableOf(null);
};

const LayoutComponent: ReactComponentT<{}> = (props) => {
  const Layout = props.children as ReactComponentT<{}>;

  if (Layout) {
    return <Layout />;
  }

  // NOTE: Should be null. Some problem with React Type definitions.
  // https://github.com/facebook/react/issues/5355
  return <noscript />;
};
const PurifiedLayoutRxComponent = fp.flowRight(Rx, purify)(LayoutComponent);

type GetLayoutRxComponent$T = (getPromisifiedLayoutFile: () => Promise<any>) => () => JSX.Element;
const getLayoutRxComponent: GetLayoutRxComponent$T = (getPromisifiedLayoutFile) => () =>
  <PurifiedLayoutRxComponent>
    {
      fp.flowRight(getLayoutFile$, getPromisifiedLayoutFile)()
    }
  </PurifiedLayoutRxComponent>;

const getPromisifiedHomeLayoutFile = () =>
  System.import<any>('@webui/layouts/Home')
    .then((module: any) => fp.pathOr(module, 'default', module));
const getPromisifiedFourOFourLayoutFile = () =>
  System.import<any>('@webui/layouts/404')
    .then((module: any) => fp.pathOr(module, 'default', module));

const Master: React.StatelessComponent<{}> = () => (
  <div
      data-testid="Master"
      className={classnames(dFlex, flexColumn)}
    >
    <header className={navbar}>
      <Link
        className={navbarBrand}
        to="/"
      >
        Website
      </Link>
      <ul className={classnames(nav, navbarNav)}>
        <li className={classnames(navItem, active)}>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </header>
    <div className={container}>
      <Switch>
        <Route exact path="/" component={getLayoutRxComponent(getPromisifiedHomeLayoutFile)} />
        <Route component={getLayoutRxComponent(getPromisifiedFourOFourLayoutFile)}/>
      </Switch>
    </div>
  </div>
);

export default Master;
