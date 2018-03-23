const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
  // entry: {
  //   client: './src/client-entry.js'
  // },
  entry: './src/client-entry.js',
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
    // new HtmlWebpackPlugin({
    //   template: './src/index.ssr.html',
    //   filename: 'index.ssr.html'
    // })
  ]
})
