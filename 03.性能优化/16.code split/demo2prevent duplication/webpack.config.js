/**
 * prevent duplication（防止重复）
 */

//绝对路径解析方法
const { resolve } = require("path");

//对html文件处理
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //单入口
    entry: './src/js/index.js',
    // entry: {
    //     index: './src/js/index.js',
    //     add: './src/js/add.js'
    // },
    output: {
        //[name]:取文件名
        filename: 'js/[name].[contenthash:10].js',
        path:resolve(__dirname,'dist'),
        clean: true,
        publicPath:'./'
    },
    optimization: {
        /**
         * 单入口只有1，多入口1、2都有
         * 1. 可以将node_modules中代码单独打包成一个chunk最终输出
         * 2. 自动分析多入口chunk中有没有公共的文件（>30kb），如果有会单独打包成一个chunk
         */
        splitChunks: {
            chunks:'all'
        }
    },
    plugins: [
        //对html文件处理
        new HtmlWebpackPlugin({
            template: './src/index.html',
            scriptLoading: 'blocking',//去除script defer模式
        })
        
    ],
    mode: 'development',
}