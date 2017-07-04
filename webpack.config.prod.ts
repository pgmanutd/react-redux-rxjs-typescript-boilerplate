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
    filename: `${DIRS.static}/js/[name]/[name].[chunkhash:8].js`,
    chunkFilename: `${DIRS.static}/js/chunks/[name].[chunkhash:8].chunk.js`,
  },
  devtool: 'source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: `${DIRS.static}/css/[name]/[name].[contenthash:8].css`,
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
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
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
      // NOTE: Special css config
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
          ],
        }),
        include: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: getCssConfig({
            localIdentName: '[hash:base64:5]',
            minimize: true,
          }),
        }),
        exclude: /node_modules/,
      },
    ],
  },
};

export default webpackMerge(webpackBaseConfig, webpackProdConfig);
