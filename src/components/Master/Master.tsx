import * as React from 'react';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import { BundleRx, Rx } from '@webui/components/Common';
import Localize from '@webui/utils/Localize';

const localize = Localize({ path: 'components/Master', filename: 'Master.tsx' });
const LocalizeRxComponent = Rx();

// TODO: Remove space after import once tslint v5.5 gets released
const homeLayoutLoader = () => import (/* webpackChunkName: "layouts/Home" */ '@webui/layouts/Home');
const fourOFourLayoutLoader = () => import (/* webpackChunkName: "layouts/404" */ '@webui/layouts/404');

const Master: React.StatelessComponent<{}> = () => (
  <div
    data-testid="Master"
    className="d-flex flex-column"
  >
    <header className="navbar">
      <Link
        className="navbar-brand"
        to="/"
      >
        <LocalizeRxComponent>
          {localize('website', 'Website')}
        </LocalizeRxComponent>
      </Link>
      <ul className="nav navbar-nav">
        <li className="nav-item active">
          <Link to="/">
            <LocalizeRxComponent>
              {localize('home', 'Home')}
            </LocalizeRxComponent>
          </Link>
        </li>
      </ul>
    </header>
    <div className="container">
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
