// import * as PropTypes from 'prop-types';
// import * as React from 'react';

// interface BundleProps {
//   readonly load: () => void;
// }

// interface BundleState {
//   module: React.Component<any, any>;
// }

// export default class Bundle extends React.PureComponent<BundleProps, BundleState> {
//   static propTypes = {
//     load: PropTypes.func.isRequired
//   };

//   constructor(props) {
//     super(props);

//     this.state = {
//       module: null
//     };
//   }

//   componentWillMount() {
//     this.load(this.props);
//   }

//   componentWillReceiveProps(nextProps: BundleProps) {
//     this.load(nextProps);
//   }

//   load(props) {
//     this.setState({
//       module: null
//     });

//     props.load(({ module }: { module: { default: React.Component<any, any> }}) => {
//       this.setState({
//         module: module.default || module
//       });
//     });
//   }

//   render() {
//     // NOTE: children should always be function type
//     return (this.props.children as BundleProps.load)(this.state.module);
//   }
// }
