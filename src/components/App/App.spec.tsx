import { render } from 'enzyme';
import * as React from 'react';

import { expect } from '@webui/common/testing-utils/setup';

import App from './App';

describe('App', () => {
  it('should not render any children', () => {
    const wrapper = render(<App />);

    expect(wrapper.find('[data-testid="App"]')).to.be.blank();
  });
});
