const merge = require('webpack-merge');
const base = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
  entry: {
    client: './src/client-entry.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ssr.html',
      filename: 'index.ssr.html'
    })
  ]
});
