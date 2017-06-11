import * as CompressionPlugin from 'compression-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as fp from 'lodash/fp';
import * as OfflinePlugin from 'offline-plugin';
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
      prod,
    },
    language,
  },
}: KeyValuePair = pkg;

const webpackProdConfig: webpack.Configuration = {
  entry: {
    [MODULE_NAME]: [
      path.resolve(__dirname, `${DIRS.src}/index`),
    ],
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[id].[chunkhash:8].chunk.js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(prod),
      '__DEV__': false,
      '__LANGUAGE__': JSON.stringify(language),
      '__FP_DEBUGGER__': fp.identity,
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    ...getHTMLPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    // TODO: Ambient Declaration for HashedModuleIdsPlugin not present
    new (webpack as any).HashedModuleIdsPlugin(),
    new OfflinePlugin({
      publicPath: '/',
      caches: {
        main: [
          `${MODULE_NAME}.*.css`,
          'vendor.*.js',
          `${MODULE_NAME}.*.js`,
          '*.chunk.js',
        ],
        additional: [
          ':externals:',
        ],
        optional: [
          ':rest:',
        ],
      },
      externals: [
        '/',
      ],
      ServiceWorker: {
        navigateFallbackURL: '/',
      },
      AppCache: {
        FALLBACK: {
          '/': '/offline-page.html',
        },
      },
      safeToUseOptionalCaches: true,
      updateStrategy: 'changed',
    }),
  ],
  module: {
    rules: [
      getTSConfig(),
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: getCssConfig({
            localIdentName: '[hash:base64:5]',
            minimize: true,
          }),
        }),
      },
    ],
  },
};

export default webpackMerge(webpackBaseConfig, webpackProdConfig);
