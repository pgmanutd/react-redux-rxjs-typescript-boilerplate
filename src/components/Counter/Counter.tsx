import * as fp from 'lodash/fp';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { NoOpT } from '@webui/components/Common';

export interface CounterProps {
  readonly min?: number;
  readonly max?: number;
  readonly timeout?: number;
  readonly onStart?: NoOpT;
  readonly onStop?: NoOpT;
}

export interface CounterState {
  value: number;
}

const defaultProps = {
  min: 0,
  max: 100,
  timeout: 1000,
  onStart: fp.noop,
  onStop: fp.noop,
};

export default class Counter extends React.PureComponent<CounterProps, CounterState> {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    timeout: PropTypes.number,
    onStart: PropTypes.func,
    onStop: PropTypes.func,
  };

  static defaultProps: Partial<CounterProps> = defaultProps;

  intervalID: NodeJS.Timer;

  constructor(args: CounterProps) {
    super(args);

    this.state = {
      value: this.props.min || defaultProps.min,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    this.stopTimer();
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    const {
      timeout: defaultTimeout,
      onStart: defaultOnStart,
    } = defaultProps;

    const {
      timeout = defaultTimeout,
      onStart = defaultOnStart,
    } = this.props;

    this.intervalID = setInterval(() =>
      this.setState(
        ({ value }) => ({
          value: value + 1,
        }),
      ), timeout);

    onStart();
  }

  stopTimer() {
    clearInterval(this.intervalID);

    const { onStop = defaultProps.onStop } = this.props;

    onStop();
  }

  render() {
    return (
      <div data-testid="Counter">
        {this.state.value}
      </div>
    );
  }
}
