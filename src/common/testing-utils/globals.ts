global.System = {
  import() {
    return Promise.resolve();
  }
};

global.__DEV__ = true;
global.__LANGUAGE__ = 'en';
