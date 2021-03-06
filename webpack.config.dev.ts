import * as path from 'path';
import * as webpack from 'webpack';
import * as DashboardPlugin from 'webpack-dashboard/plugin';
import * as webpackMerge from 'webpack-merge';
import * as pkg from './package.json';
import webpackBaseConfig, {
  getCssConfig,
  getHTMLPlugin,
  getTSConfig,
} from './webpack.config.base';

const {
  name: MODULE_NAME,
  config: {
    dirs: DIRS,
    env: {
      dev,
    },
    host,
    port,
    api: {
      host: apiHost,
      port: apiPort,
    },
  },
}: KeyValuePair = pkg;

const webpackDevConfig: webpack.Configuration = {
  entry: {
    [MODULE_NAME]: [
      'react-hot-loader/patch',
      path.resolve(__dirname, `${DIRS.src}/index`),
    ],
  },
  output: {
    filename: `${DIRS.static}/js/[name]/[name].js`,
    chunkFilename: `${DIRS.static}/js/chunks/[name].chunk.js`,
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(dev),
      '__DEV__': true,
      '__LANGUAGE__': JSON.stringify('en'),
      '__FP_DEBUGGER__': <T>(arg: T): T => {
        // tslint:disable-next-line:no-console
        console.log(arg);

        return arg;
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    ...getHTMLPlugin(),
    new DashboardPlugin(),
  ],
  module: {
    rules: [
      getTSConfig([{
        loader: 'react-hot-loader/webpack',
      }]),
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          ...getCssConfig({
            localIdentName: '[name]__[local]___[hash:base64:5]',
            sourceMap: true,
          }),
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    open: true,
    openPage: '',
    contentBase: path.resolve(__dirname, DIRS.dist),
    publicPath: '/',
    historyApiFallback: true,
    inline: true,
    overlay: true,
    host,
    port,
    proxy: {
      '/service': {
        target: `http://${apiHost}:${apiPort}`,
        pathRewrite: { '^/service': '' },
      },
    },
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
};

export default webpackMerge(webpackBaseConfig, webpackDevConfig);
