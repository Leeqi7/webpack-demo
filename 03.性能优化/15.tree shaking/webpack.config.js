/**
 * tree shaking：去除无用代码
 * js文件
 * 前提：1.必须使用es6模块化(webpack4) 2.开启production环境
 * 作用：减少代码体积
 * 
 * 在package.json中配置
 * "sideEffects":false 所有代码都没有副作用（都可以进行tree shaking）
 * 问题：可能会把css文件删掉
 * "sideEffects": true 所有文件都有副作用，全都不可 tree-shaking
 * "sideEffects": ["*.css","*.less"]
 * 除了css,less文件有副作用，所有其他文件都可以 tree-shaking，但会保留这些文件
 */

//绝对路径解析方法
const { resolve } = require("path");

//提取css成单独文件插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//最新压缩css插件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

//手动添加webpack内部js压缩器
const TerserWebpackPlugin = require('terser-webpack-plugin');

//对html文件处理
const HtmlWebpackPlugin = require('html-webpack-plugin');

//默认使用生产环境，定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production'

//复用loader
const commonCssloader = [
    MiniCssExtractPlugin.loader,//提取css为单独文件
    'css-loader',
    {//兼容性处理 还需要在package.json中定义browserslist
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                ident: 'postcss',
                plugins: [
                    'postcss-preset-env'
                ]
            }
        }
    }
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bundle.[contenthash:10].js',
        path:resolve(__dirname,'dist'),
        clean: true,
        publicPath:'./'
    },
    //压缩css
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin(),
            new CssMinimizerPlugin()
        ]
    },
    module: {
        rules: [
            /**
             *  正常来讲，一个文件只能被一个loader处理
             *  当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
             *  在loader中设置enforce:'pre'，最先执行
             */
            {
                //优化生产环境打包构建速度
                //以下loader只会匹配一个
                //注意：这里不能有两个配置处理同一种类型文件
                oneOf: [
                    {
                        //css兼容性处理
                        test: /\.css$/,
                        use: [...commonCssloader],
                    },
                    {
                        //less兼容性处理
                        test: /\.less$/,
                        use: [...commonCssloader,
                            //use中loader执行从下往上，必须把这个处理放在css-loader与less-loader之间
                            'less-loader'//将less转成css文件
                        ],
                    },
                    {
                        //js兼容性处理
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader', //配置在.babelrc文件中
                        options: {
                            //开启babel缓存，第二次构建时会读取之前的缓存
                            //问题：当文件名没有发生变化的时候，同名文件都是走缓存。会导致修改内容与实际展示内容不一致。
                            cacheDirectory:true 
                        }
                    },
                    {
                        //图片处理
                        test: /\.(jpg|png|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,//对8kb以下的图片进行base64处理
                            name: '[name].[hash:8].[ext]',//对处理后的图片重命名
                            outputPath: 'img', //设置处理后的图片路径
                            publicPath: './', //指定打包后的css图片的基础路径,
                            esModule:false //关闭es6模块化
                        }
                    },
                    {
                        //处理html中的图片问题
                        test: /\.html$/,
                        loader: 'html-loader',
                        options: {
                            esModule:false
                        }
                    },
                    {
                        //处理其他文件
                        exclude: /\.(js|css|less|html|jpg|png|gif)$/,
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath:'media'
                        },
                        // type: 'asset/resource',
                        // generator: {
                        //     filename: 'media/[name].[hash:6].[ext]'
                        // }
                    },
                ]
            }
        ]
    },
    plugins: [
        //提取css为单独文件
        new MiniCssExtractPlugin({
            filename:'css/built.[contenthash:10].css'
        }),
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
    devtool:'source-map'
}