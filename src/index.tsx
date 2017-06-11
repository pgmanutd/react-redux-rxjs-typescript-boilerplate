import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from '@webui/components/App';

type RenderT = (Component: React.StatelessComponent<{}>) => void;
const render: RenderT = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('@webui/components/App', () => {
    render(App);
  });
}
