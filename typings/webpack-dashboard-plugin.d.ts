declare module 'webpack-dashboard/plugin' {
  import { Plugin } from 'webpack';

  interface WebpackDashboardPlugin extends Plugin {
    new(options?: any): any;
  }

  const webpackDashboardPlugin: WebpackDashboardPlugin;
  export = webpackDashboardPlugin;
}
