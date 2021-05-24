const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].js',
        path: resolve(__dirname, 'dist'),
        clean: true, //清理旧文件
    },
    module: {
        rules: [
            //loader的配置
            {
                test: /\.css$/,
                //多个loader用use
                use:['style-loader','css-loader']
            },
            {
                test: /\.js$/,
                //排除node_modules下的js文件
                exclude: /node_modules/,
                //只检查src下的js文件
                include: resolve(__dirname, 'src'),
                //优先执行
                enforce: 'pre',
                //延后执行
                // enforce: 'post',
                //多个loader用use
                loader: 'eslint-loader',
                options:{}
            },
            {
                //以下配置只会生效一个
                oneOf:[]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode:'development'

}