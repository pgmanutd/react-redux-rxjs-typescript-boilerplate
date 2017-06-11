import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import * as styles from './app.css';

import Master from '@webui/components/Master';
import Themer from '@webui/components/Themer';

const App: React.StatelessComponent<{}> = () => (
  <Themer>
    <div
      data-testid="App"
      className={styles.app}
    >
      <Router>
        <Switch>
          <Route path="/" component={Master} />
        </Switch>
      </Router>
    </div>
  </Themer>
);

export default App;
