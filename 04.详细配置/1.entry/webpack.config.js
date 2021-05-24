const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

/**
 * entry：入口起点
 * 1、string --> './src/js/index.js'
 *  单入口
 *  打包形成一个chunk，输出一个bundle文件
 * 此时chunk的名称默认是main  '[name].js'
 * 2、array --> ['./src/js/index.js','./src/js/add.js']
 *  多入口
 * 所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件
 *  --> 只有在HMR功能中让html热更新生效 ['./src/js/index.js','./src/index.html']
 * 3、object
 *  多入口
 *  有几个入口文件就形成几个chunk，输出几个bundle文件（key/value）
 * 此时chunk的名称是key
 *  {
        index:'./src/js/index.js',
        add:'./src/js/add.js'
    }
 * 
 *  --> 特殊用法
 *  {
 *      所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件
 *      可以把同一类型的文件打包进一个chunk
        index:['./src/js/index.js','./src/js/count.js'],
        react:['react','react-dom','react-router-dom'],
        
        add:'./src/js/add.js'
    }
 */

module.exports = {
    entry: {
        index:'./src/js/index.js',
        add:'./src/js/add.js'
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist'),
        clean:true
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode:'development'
}