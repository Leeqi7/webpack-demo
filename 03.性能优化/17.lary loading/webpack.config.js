/**
 * lary 懒加载
 */

//绝对路径解析方法
const { resolve } = require("path");

//对html文件处理
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //单入口
    entry: './src/js/index.js',
    output: {
        //[name]:取文件名
        filename: 'js/[name].[contenthash:10].js',
        path:resolve(__dirname,'dist'),
        clean: true,
        publicPath:'./'
    },
    optimization: {
        splitChunks: {
            chunks:'all'
        }
    },
    plugins: [
        //对html文件处理
        new HtmlWebpackPlugin({
            template: './src/index.html',
            scriptLoading: 'blocking',//去除script defer模式
            //html压缩
            mimify: {
                //移除空格
                collaspeWhitespace: true,
                //移除注释
                removeComments:true
            }
        })
        
    ],
    //mode为production，js就自动压缩了
    mode: 'production',
}