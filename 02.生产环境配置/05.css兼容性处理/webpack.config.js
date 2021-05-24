const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//设置node环境变量：
//process.env.NODE_ENV = 'development'

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
                    },
                    /**
                     * css兼容性处理：postcss --> postcss-loader postcss-preset-env 识别某些环境加载指定的配置，让兼容性更精确
                     * 帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                     * 
                     * "browserslist":{
                     * 开发环境-->设置node环境变量：process.env.NODE_ENV = development
                            "development":[
                            "last 1 chrome version",
                            "last 1 firefox version",
                            "last 1 safari version"
                            ],
                            开发环境 默认是生产环境
                            "production":[
                            ">0.2%",
                            "no dead",
                            "not op_mini all"
                            ]
                        }
                     * 
                     */
                    //使用loader的默认配置  
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