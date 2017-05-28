import { ReactComponentT } from './Rx';

const rename = <P, C extends ReactComponentT<P>>(
  name: string,
  component: C
): C => {
  component.displayName = name;

  return component;
};

export default rename;
