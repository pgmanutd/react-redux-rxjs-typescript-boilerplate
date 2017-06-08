'use strict';

const ResolverFactory = require('enhanced-resolve/lib/ResolverFactory');
const NodeJsInputFileSystem = require('enhanced-resolve/lib/NodeJsInputFileSystem');
const CachedInputFileSystem = require('enhanced-resolve/lib/CachedInputFileSystem');

const pkg = require('./package.json');
const webpackBaseConfig = require('./webpack.config.base').default;

const CACHED_DURATION = 60000;
const fileSystem = new CachedInputFileSystem(new NodeJsInputFileSystem(), CACHED_DURATION);

const {
  config: {
    dirs: DIRS
  }
} = pkg;

const resolver = ResolverFactory.createResolver(
  Object.assign({},
    webpackBaseConfig.resolve, {
      modules: [DIRS.src, 'node_modules'],
      useSyncFileSystemCalls: true,
      fileSystem
    })
);

module.exports = {
  plugins: {
    'postcss-import': {
      resolve(id, basedir) {
        return resolver.resolveSync({}, basedir, id);
      }
    },
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%'],
    }
  }
};
