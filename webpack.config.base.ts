import * as FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import * as webpack from 'webpack';
import * as pkg from './package.json';

const {
  name: MODULE_NAME,
  description,
  config: {
    dirs: DIRS,
    productionURL,
  },
}: KeyValuePair = pkg;

type CSSRuleConfigT = ({ localIdentName, minimize, sourceMap }: KeyValuePair) => webpack.Loader[];
export const getCssConfig: CSSRuleConfigT = ({ localIdentName, minimize = false, sourceMap = false }) => ([{
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 1,
    camelCase: true,
    sourceMap,
    localIdentName,
    minimize,
  },
}, {
  loader: 'postcss-loader',
  options: {
    sourceMap,
  },
}]);

type TSRuleConfigT = (tsRules?: webpack.Loader[]) => webpack.NewUseRule;
export const getTSConfig: TSRuleConfigT = (tsRules = []) => ({
  test: /\.tsx?$/,
  use: [
    ...tsRules, {
      loader: 'awesome-typescript-loader',
      options: {
        configFileName: 'tsconfig.es2015.json',
      },
    },
  ],
  exclude: /node_modules/,
});

type HTMLPluginT = (options?: KeyValuePair) => HtmlWebpackPlugin[];
export const getHTMLPlugin: HTMLPluginT = (options = {}) => ([
  new HtmlWebpackPlugin({
    title: description,
    productionURL,
    template: 'public/views/index.ejs',
    inject: true,
    chunksSortMode: 'dependency',
    ...options,
  }),
  new HtmlWebpackPlugin({
    productionURL,
    filename: 'javascript-required.html',
    template: 'public/views/javascript-required.ejs',
    inject: false,
    ...options,
  }),
  new HtmlWebpackPlugin({
    productionURL,
    filename: 'offline-page.html',
    template: 'public/views/offline-page.ejs',
    inject: false,
    ...options,
  }),
  new HtmlWebpackPlugin({
    productionURL,
    filename: 'upgrade-browser.html',
    template: 'public/views/upgrade-browser.ejs',
    inject: false,
    ...options,
  }),
]);

const webpackBaseConfig: webpack.Configuration = {
  resolve: {
    alias: {
      '@webui': path.resolve(__dirname, DIRS.src),
    },
    extensions: ['.js', '.ts', '.tsx', '.json', '.css'],
  },
  entry: {
    vendor: path.resolve(__dirname, `${DIRS.src}/common/vendor`),
  },
  output: {
    path: path.resolve(__dirname, DIRS.dist),
    publicPath: '/',
  },
  plugins: [
    new webpack.BannerPlugin(
      `${pkg.name} - v${pkg.version} * ${pkg.homepage} * (c) ${new Date().getFullYear()} ${pkg.author.name} * licensed ${pkg.license}`,
    ),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: [MODULE_NAME],
      children: true,
      async: true,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
      preload: /\.js$/,
      prefetch: /\.js$/,
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 100,
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'public/imgs/favicon.jpg'),
      prefix: `${DIRS.static}/media/icons-[hash]/`,
      emitStats: false,
      statsFilename: 'iconstats-[hash].json',
      persistentCache: true,
      inject: true,
      background: '#fff',
      title: MODULE_NAME,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader',
    }, {
      enforce: 'pre',
      test: /\.tsx?$/,
      loader: 'source-map-loader',
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.(woff|woff2|ttf|eot)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: `${DIRS.static}/media/fonts/[hash:8].[ext]`,
        },
      }],
    }, {
      test: /\.(png|jpe?g|gif|ico|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: `${DIRS.static}/media/imgs/[hash:8].[ext]`,
        },
      }, {
        loader: 'img-loader',
      }],
    }],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

export default webpackBaseConfig;
