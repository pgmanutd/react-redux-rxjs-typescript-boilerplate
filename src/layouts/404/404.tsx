import * as classnames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Rx } from '@webui/components/Common';
import Localize from '@webui/utils/Localize';

import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

const localize = Localize('layouts/404/404.tsx');
const LocalizeRxComponent = Rx();

const {
  textCenter,
  jumbotron,
  display2,
  display3,
  lead,
  btn,
  btnLg,
  btnPrimary,
} = bootstrap;

const FourOFourLayout: React.StatelessComponent<{}> = () => (
  <div
    data-testid="FourOFourLayout"
    className={textCenter}
  >
    <div className={jumbotron}>
      <h1 className={display2}>
        <LocalizeRxComponent>
          {localize('oops!', 'Oops!')}
        </LocalizeRxComponent>
      </h1>
      <h1 className={display3}>
        <LocalizeRxComponent>
          {localize('404NotFoundHeader', '404 Not Found')}
        </LocalizeRxComponent>
      </h1>
      <p className={lead}>
        <LocalizeRxComponent>
          {localize('404NotFoundBody', 'Sorry, an error has occurred, Requested page not found!')}
        </LocalizeRxComponent>
      </p>
      <p>
        <Link
          className={classnames(btn, btnLg, btnPrimary)}
          to="/"
          role="button"
        >
          <LocalizeRxComponent>
            {localize('takeMeHome', 'Take Me Home')}
          </LocalizeRxComponent>
        </Link>
      </p>
    </div>
  </div>
);

export default FourOFourLayout;
