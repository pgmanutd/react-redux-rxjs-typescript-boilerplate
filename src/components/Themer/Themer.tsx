import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface ThemerProps {
  readonly theme?: string;
}

const DEFAULT_THEME: string = 'Day';

const bodyClassList: DOMTokenList = document.body.classList;

/**
 * Impure component that changes the theme on the `body` tag
 */
export default class Themer extends React.PureComponent<ThemerProps, {}> {
  static propTypes = {
    theme: PropTypes.string,
  };

  static defaultProps: Partial<ThemerProps> = {
    theme: DEFAULT_THEME,
  };

  componentDidMount() {
    this.addTheme({ theme: this.props.theme });
  }

  componentDidUpdate({ theme }: ThemerProps) {
    this.removeTheme({ theme });

    this.addTheme({ theme: this.props.theme });
  }

  componentWillUnmount() {
    this.removeTheme({ theme: this.props.theme });
  }

  addTheme({ theme }: ThemerProps) {
    if (theme) {
      bodyClassList.add(theme);
    }
  }

  removeTheme({ theme }: ThemerProps) {
    if (theme) {
      bodyClassList.remove(theme);
    }
  }

  render() {
    return (
      <div data-testid="Themer">
        {this.props.children}
      </div>
    );
  }
}
