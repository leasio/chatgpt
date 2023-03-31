const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base');
const paths = require('./paths');

module.exports = merge(baseConfig, {
  target: 'node',
  entry: {
    'server-entry': paths.serverEntry,
  },
  output: {
    libraryTarget: 'commonjs',
  },
  externals: [nodeExternals()],
})