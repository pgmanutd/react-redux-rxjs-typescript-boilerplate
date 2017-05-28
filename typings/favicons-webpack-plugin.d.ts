declare module 'favicons-webpack-plugin' {
  import { Plugin } from 'webpack';

  interface FaviconsWebpackPlugin extends Plugin {
    new(options?: any): any;
  }

  const faviconsWebpackPlugin: FaviconsWebpackPlugin;
  export = faviconsWebpackPlugin;
}
