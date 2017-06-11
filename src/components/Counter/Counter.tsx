// import * as fp from 'lodash/fp';
// import * as PropTypes from 'prop-types';
// import * as React from 'react';

// import { NoOpT } from '@webui/components/Common';

// export interface CounterProps {
//   readonly min?: number;
//   readonly max?: number;
//   readonly timeout?: number;
//   readonly onStart?: NoOpT;
//   readonly onStop?: NoOpT;
// }

// export interface CounterState {
//   value: number;
// }

// const DEFAULT_PROPS = {
//   min: 0,
//   max: 100,
//   timeout: 1000,
//   onStart: fp.noop,
//   onStop: fp.noop
// };

// let intervalID: NodeJS.Timer;

// export default class Counter extends React.PureComponent<CounterProps, CounterState> {
//   static propTypes = {
//     min: PropTypes.number,
//     max: PropTypes.number,
//     timeout: PropTypes.number,
//     onStart: PropTypes.func,
//     onStop: PropTypes.func
//   };

//   static defaultProps: Partial<CounterProps> = DEFAULT_PROPS;

//   constructor(args: CounterProps) {
//     super(args);

//     this.state = {
//       value: this.props.min || DEFAULT_PROPS.min
//     };
//   }

//   componentDidMount() {
//     this.startTimer();
//   }

//   componentDidUpdate() {
//     this.stopTimer();
//     this.startTimer();
//   }

//   startTimer() {
//     const {
//       timeout: defaultTimeout,
//       onStart: defaultOnStart
//     } = DEFAULT_PROPS;

//     const {
//       timeout = defaultTimeout,
//       onStart = defaultOnStart
//     } = this.props;

//     intervalID = setInterval(() =>
//       this.setState(
//         ({ value }) => ({
//           value: value + 1
//         })
//       ), timeout);

//     onStart();
//   }

//   stopTimer() {
//     if (intervalID) {
//       clearInterval(intervalID);

//       const { onStop = DEFAULT_PROPS.onStop } = this.props;

//       onStop();
//     }
//   }

//   render() {
//     return (
//       <div data-testid="Counter">
//         {this.state.value}
//       </div>
//     );
//   }
// }
