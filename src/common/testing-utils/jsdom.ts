// NOTE: https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md

import { jsdom } from 'jsdom';
import * as fp from 'lodash/fp';

global.document = jsdom('');
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js',
};

function copyProps(src: Window, target: NodeJS.Global) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => fp.isUndefined(target[prop]))
    .reduce((accum, prop) => ({
      ...accum,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});

  Object.defineProperties(target, props);
}

copyProps(document.defaultView, global);
