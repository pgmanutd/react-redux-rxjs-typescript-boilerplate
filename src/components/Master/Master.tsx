import * as classnames from 'classnames';
import * as React from 'react';
import {
  Link,
  Route,
  Switch
} from 'react-router-dom';

import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

import FourOFourLayout from '@webui/layouts/404';
import HomeLayout from '@webui/layouts/Home';

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
        <Route exact path="/" component={HomeLayout} />
        <Route component={FourOFourLayout}/>
      </Switch>
    </div>
  </div>
);

export default Master;
