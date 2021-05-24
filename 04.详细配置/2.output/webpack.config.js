const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        //文件名称（指定名称+目录）
        filename: 'js/[name].js',
        //输出文件目录（将来所有资源输出的公共目录）
        path: resolve(__dirname, 'dist'),
        /**
         * （生产环境适用）所有资源引入的路径前缀 
         * --> 'imgs/a.jpg' 是在当前路径下直接找imgs
         *      '/imgs/a.jpg' “/”会以当前服务器地址补充 在服务器根目录下去找imgs目录再找a.jpg 代码上线是更倾向于使用这种路径
         * 用publicPath:'/'
         */
        publicPath: '/', //资源引入的时候路径前面加/
        clean: true, //清理旧文件
        /**
         * chunkFilename，非入口文件chunk的名称，不是entry指定的入口文件
         * 1. import方式引入的
         * 2. optimization 将node_modules里的分割成单独的chunk
         * webpack5 自动命名 加上了源文件目录信息 js/src_js_add_js.js
         * 使用chunkFilename之后为 js/src_js_add_js_chunk.js
         * 都是输出到filename指定的目录下（chunkFilename指定目录优先）
         */
        // chunkFilename:'js/[name]_chunk.js', 
        /**
         * 使用dll将某个库单独打包引用，才需要用到library
         * library:'[name]' 整个库想外暴露的变量名
         * libraryTarget:'window' 变量名添加到哪个上 适用于browser
         * libraryTarget:'global' 变量名添加到哪个上 适用于node
         * libraryTarget:'commonjs' 使用模块化语法引入
         */
        // library: '[name]',
        
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode:'development'

}