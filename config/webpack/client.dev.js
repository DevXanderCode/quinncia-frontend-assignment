const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./common');

const clientEntrypoint = path.resolve(__dirname, '../src/client/index.jsx');

module.exports = merge(common, {
  mode: 'development',
  target: 'web',
  devtool: 'eval-source-map',
  name: 'client',
  entry: {
    app: ['react-hot-loader/patch', 'webpack-hot-middleware/client?timeout=2000&path=/__webpack_hmr', clientEntrypoint],
  },
  output: {
    filename: '[name].js',
    publicPath: '/static/',
    hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: '.hot/[hash].hot-update.json',
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
