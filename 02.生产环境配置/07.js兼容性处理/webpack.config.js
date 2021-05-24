const HtmlWebpackPlugin = require("html-webpack-plugin");
const {resolve} = require('path')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bundles.js',
        path: resolve(__dirname, 'dist'),
        clean:true
    },
    module: {
        rules: [
            /**
             * js兼容性处理：babel-loader @babel/core @babel/preset-env
             * 1. 基本js兼容性处理 --> @babel/preset-env
             *    问题：只能转换基本语法（es6->es5），如promise不能转换
             * 2. 全部js兼容性处理 --> 安装core-js，配置.babelrc文件  @babel/polyfill(废弃) 
             *  options: { 预设：指示babel做怎么样的兼容性处理
                    "presets": [
                        [
                            "@babel/preset-env",
                            { 
                                "debug": true,  //在cmd窗口打印对应引用信息
                                "useBuiltIns": "usage",  // 这里配置usage 会自动根据你使用的方法以及你配置的浏览器支持版本引入对应的方法。
                                "corejs":3  // 指定 corejs 版本
                            }
                        ]
                    ]
                }
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development'
}