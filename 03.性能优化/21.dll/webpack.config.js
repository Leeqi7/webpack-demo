const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean:true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // inject: 'head',
      scriptLoading: 'blocking'
    }),
    //告诉webpack哪些库不参与打包，同时使用时的名称也得变
    new webpack.DllReferencePlugin({
      manifest:path.resolve(__dirname,'dll/manifest.json')
    }),
    //将某个文件打包出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, 'dll/jquery.js'),
      // outputPath:'./dist',
      publicPath: ''
      // includeSourcemap: true
    })
  ],
  mode: 'production',
  devtool:'source-map'
  
};
