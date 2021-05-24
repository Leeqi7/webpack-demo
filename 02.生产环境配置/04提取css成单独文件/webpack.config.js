const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//将css提取为单独文件 下载插件mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bundles.js',
        path: resolve(__dirname, 'dist'),
        clean:true //清理旧文件
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader:MiniCssExtractPlugin.loader, //取代style-loader，提取js中的css成单独文件
                    //创建style标签，将样式放入
                    //'style-loader'
                        options: {
                            publicPath:'./'
                        }
                    },
                    {
                        loader: 'css-loader', //将css文件整合到js文件中
                        options: {
                            import:true, //启用/禁用 @import 处理
                        }
                    }
                ]
                
            }
        ]
    },
    plugins:[ 
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            //对输出的css文件进行重命名
            filename:'css/built.css'
        })
    ],
    mode:'development'
}