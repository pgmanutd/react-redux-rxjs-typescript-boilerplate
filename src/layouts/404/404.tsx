import * as React from 'react';
import { Link } from 'react-router-dom';

import { Rx } from '@webui/components/Common';
import Localize from '@webui/utils/Localize';

const localize = Localize({ path: 'layouts/404', filename: '404.tsx' });
const LocalizeRxComponent = Rx();

const FourOFourLayout: React.StatelessComponent<{}> = () => (
  <div
    data-testid="FourOFourLayout"
    className="text-center"
  >
    <div className="jumbotron">
      <h1 className="display-2">
        <LocalizeRxComponent>
          {localize('oops!', 'Oops!')}
        </LocalizeRxComponent>
      </h1>
      <h1 className="display-3">
        <LocalizeRxComponent>
          {localize('404NotFoundHeader', '404 Not Found')}
        </LocalizeRxComponent>
      </h1>
      <p className="lead">
        <LocalizeRxComponent>
          {localize('404NotFoundBody', 'Sorry, an error has occurred, Requested page not found!')}
        </LocalizeRxComponent>
      </p>
      <p>
        <Link
          className="btn btn-lg btn-primary"
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
