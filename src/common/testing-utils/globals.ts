import * as fp from 'lodash/fp';

global.System = {
  import() {
    return Promise.resolve();
  },
};

global.__DEV__ = true;
global.__LANGUAGE__ = 'en';
global.__FP_DEBUGGER__ = fp.identity;

window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = fp.identity;
