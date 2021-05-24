/**
 * code split
 * 入口为一个对象
 * entry:{}
 */

//绝对路径解析方法
const { resolve } = require("path");

//对html文件处理
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //单入口
    //entry: './src/js/index.js',
    
    entry: {
        //多入口：一个入口 --> 输出就有一个bundle
        index: './src/js/index.js',
        add: './src/js/add.js'
    },
    output: {
        //[name]:取文件名
        filename: 'js/[name].[contenthash:10].js',
        path:resolve(__dirname,'dist'),
        clean: true,
        publicPath:'./'
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