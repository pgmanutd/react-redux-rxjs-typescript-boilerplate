import * as React from 'react';

import { Rx } from '@webui/components/Common';
import Localize from '@webui/utils/Localize';

import TestImage from '../../../public/imgs/test.jpg';

const localize = Localize({ path: 'layouts/Home', filename: 'Home.tsx' });
const LocalizeRxComponent = Rx();

const HomeLayout: React.StatelessComponent<{}> = () => (
  <div data-testid="HomeLayout">
    <LocalizeRxComponent>
      {localize('helloWorld', 'Hello World')}
    </LocalizeRxComponent>
    <div>
      <img src={TestImage} />
    </div>
  </div>
);

export default HomeLayout;
