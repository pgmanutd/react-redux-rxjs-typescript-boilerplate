import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { expect } from '@webui/common/testing-utils/setup';

import Themer, { ThemerProps } from './Themer';

let sandbox: sinon.SinonSandbox;

describe('Themer', () => {
  let wrapper: ReactWrapper<ThemerProps, {}>;

  beforeEach(() => {
    global.document.body.className = '';

    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call componentDidMount', () => {
    sandbox.spy(Themer.prototype, 'componentDidMount');

    mount(<Themer />);

    /* tslint:disable-next-line:no-unused-expression */
    expect(Themer.prototype.componentDidMount).to.have.been.calledOnce;
  });

  describe('when no theme is passed', () => {
    beforeEach(() => {
      wrapper = mount(<Themer />);
    });

    it('should set default "Day" theme prop', () => {
      expect(wrapper.props().theme).to.equal('Day');
    });

    it('should set default "Day" theme on the document body', () => {
      expect(global.document.body.classList[0]).to.equal('Day');
    });
  });

  describe('when theme is passed', () => {
    beforeEach(() => {
      wrapper = mount(<Themer theme="Night" />);
    });

    it('should set the prop', () => {
      expect(wrapper.props().theme).to.equal('Night');
    });

    it('should set it on the document body', () => {
      expect(global.document.body.classList[0]).to.equal('Night');
    });
  });

  describe('when prop changes', () => {
    beforeEach(() => {
      wrapper = mount(<Themer />);
    });

    describe('and theme is passed', () => {
      beforeEach(() => {
        wrapper.setProps({ theme: 'Dark' });
      });

      it('should set updated theme prop', () => {
        expect(wrapper.props().theme).to.equal('Dark');
      });

      it('should set updated theme on the document body', () => {
        expect(global.document.body.classList[0]).to.equal('Dark');
      });
    });

    describe('and no theme is passed', () => {
      beforeEach(() => {
        wrapper.setProps({});
      });

      it('should set default "Day" theme prop', () => {
        expect(wrapper.props().theme).to.equal('Day');
      });

      it('should set default "Day" theme on the document body', () => {
        expect(global.document.body.classList[0]).to.equal('Day');
      });
    });
  });

  it('should remove the current theme from the document body', () => {
    wrapper = mount(<Themer />);

    wrapper.unmount();

    expect(global.document.body.classList).to.have.lengthOf(0);
  });
});
