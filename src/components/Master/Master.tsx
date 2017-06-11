import * as classnames from 'classnames';
import * as React from 'react';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import { BundleRx } from '@webui/components/Common';

import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

const {
  dFlex,
  flexColumn,
  nav,
  navbar,
  navbarBrand,
  navbarNav,
  navItem,
  active,
  container,
} = bootstrap;

const getPromisifiedHomeLayoutBundle = () => System.import<any>('@webui/layouts/Home');
const getPromisifiedFourOFourLayoutBundle = () => System.import<any>('@webui/layouts/404');

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
        <Route exact path="/" component={BundleRx(getPromisifiedHomeLayoutBundle)} />
        <Route component={BundleRx(getPromisifiedFourOFourLayoutBundle)}/>
      </Switch>
    </div>
  </div>
);

export default Master;
