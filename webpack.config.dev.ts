import * as path from 'path';
import * as webpack from 'webpack';
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
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
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
};

export default webpackMerge(webpackBaseConfig, webpackDevConfig);
