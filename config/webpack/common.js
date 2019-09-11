const path = require('path');

const js = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  use: {
    loader: 'babel-loader',
  },
};

const scss = {
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader'],
};

const css = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};

const file = {
  test: /\.(ttf|eot|svg|woff2?|png|gif|jpe?g)/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: '[name]-[sha512:hash:base64:7].[ext]',
    },
  }],
};

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist/public'),
  },
  module: {
    rules: [
      js,
      scss,
      css,
      file,
    ],
  },
};
