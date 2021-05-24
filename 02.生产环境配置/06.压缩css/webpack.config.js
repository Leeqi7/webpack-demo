const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//设置node环境变量：决定使用browserslist的哪个环境
//process.env.NODE_ENV = 'development'
//默认在生产环境压缩

//最新压缩css插件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bundles.js',
        path: resolve(__dirname, 'dist'),
        clean:true //清理旧文件
    },
    //压缩css
    optimization: {
        minimize: true, //默认在生产环境，在开发环境要使用压缩就要设置minimize为true
        minimizer: [
            new CssMinimizerPlugin()
        ]
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
                    },
                    
                    //'postcss-loader'
                    //修改loader配置
                    {
                        loader: 'postcss-loader',//转换css
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: [
                                    //require('postcss-preset-env')()
                                    'postcss-preset-env'//效果一样，运行时还是会转化成requeire("")来运行。
                                    //但并不是所有的插件都可以简写，因为有些插件时需要传入额外的参数的，所以有些插件不能简写
                                ]
                            }
                            
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