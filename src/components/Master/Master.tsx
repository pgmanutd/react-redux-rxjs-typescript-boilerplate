import * as classnames from 'classnames';
import * as React from 'react';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import { BundleRx, Rx } from '@webui/components/Common';
import Localize from '@webui/utils/Localize';

import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

const localize = Localize({ path: 'components/Master', filename: 'Master.tsx' });
const LocalizeRxComponent = Rx();

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

// TODO: Remove space after import once tslint v5.5 gets released
const homeLayoutLoader = () => import (/* webpackChunkName: "layouts/Home" */ '@webui/layouts/Home');
const fourOFourLayoutLoader = () => import (/* webpackChunkName: "layouts/404" */ '@webui/layouts/404');

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
        <LocalizeRxComponent>
          {localize('website', 'Website')}
        </LocalizeRxComponent>
      </Link>
      <ul className={classnames(nav, navbarNav)}>
        <li className={classnames(navItem, active)}>
          <Link to="/">
            <LocalizeRxComponent>
              {localize('home', 'Home')}
            </LocalizeRxComponent>
          </Link>
        </li>
      </ul>
    </header>
    <div className={container}>
      <Switch>
        <Route
          exact path="/"
          component={
            BundleRx({
              loader: homeLayoutLoader,
              LoadingComponent: (
                <LocalizeRxComponent>
                  {
                    localize(
                      'homeDelayMessage',
                      'Loading Home Layout. Wait for 5 sec. Also keep an eye on network tab of devtools.',
                    )
                  }
                </LocalizeRxComponent>
              ),
              delay: 5000,
            })
          }
        />
        <Route
          component={
            BundleRx({
              loader: fourOFourLayoutLoader,
            })
          }
        />
      </Switch>
    </div>
  </div>
);

export default Master;
