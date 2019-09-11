const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const common = require('./common');

const serverEntrypoint = path.resolve(__dirname, '../../src/server/index.js');

module.exports = merge(common, {
  mode: 'development',
  target: 'node',
  name: 'server',
  entry: {
    server: [serverEntrypoint],
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../../dist'),
  },
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
});
