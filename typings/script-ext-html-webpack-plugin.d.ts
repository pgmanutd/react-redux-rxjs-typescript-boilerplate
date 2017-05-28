declare module 'script-ext-html-webpack-plugin' {
  import { Plugin } from 'webpack';

  interface ScriptExtHtmlWebpackPlugin extends Plugin {
    new(options?: any): any;
  }

  const scriptExtHtmlWebpackPlugin: ScriptExtHtmlWebpackPlugin;
  export = scriptExtHtmlWebpackPlugin;
}
