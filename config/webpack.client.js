const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const paths = require('./paths');

module.exports = merge(baseConfig, {
  target: 'web',
  entry: {
    app: paths.clientEntry,
  },
  output: {
    // 指向 public 目录
    path: paths.publicDir,
  },
});