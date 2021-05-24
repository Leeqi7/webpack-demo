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
    {
        loader: MiniCssExtractPlugin.loader,//提取css为单独文件
        options: {
            publicPath:'./'
        }
    },
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
        filename: 'js/bundle.js',
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
             *  当一个文件(例如js)要被多个loader处理，那么一定要指定loader执行的先后顺序
             *  在loader中设置enforce:'pre'，最先执行
             */
            {
                //css兼容性处理
                test: /\.css$/,
                use: [...commonCssloader]
            },
            {
                //less兼容性处理
                test: /\.less$/,
                use: [...commonCssloader,
                    //use中loader执行从下往上，必须把这个处理放在css-loader与less-loader之间
                    'less-loader'//将less转成css文件
                ]
            },
            {
                //js兼容性处理
                test: /\.js$/,
                exclude: /node_modules/,
                loader:'babel-loader' //配置在.babelrc文件中
            },
            {
                //图片处理
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,//对8kb以下的图片进行base64处理
                    name: '[name].[hash:8].[ext]',//对处理后的图片重命名
                    outputPath: 'img', //设置处理后的图片路径
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
            // 打包iconfont字体图标，和打包图片类似
            {
                test:/\.ttf$/,
                loader: 'file-loader',
                options: {
                    esModule: false, // 新版本中esModule默认为true，会导致文件的地址变为[object Module],因此这里设置为false
                    name: '[name]_[hash:6].[ext]', // 输出的文件名为[原名称]_[哈希值].[原后缀]
                    outputPath: 'fonts/',       // 文件存储路径（output.path + 值）（物理路径, 存储路径）
                    publicPath:'../fonts' ,     // 负责输出目录, 即打包后的写在磁盘的位置
                     // 输出解析文件的目录，url 相对于 HTML 页面（index.html所在文件夹的绝对路径 + 值）（文件引用路径就是看这个）
                    // 如果output设置了publicPath， options也设置了publicPath，优先以options的publicPath为主
                    // 是对页面引入资源的补充,比如img标签引入或者css引入等.
                    // 千万不能设错，应该观察文件和HTML页面的存储地址位置，进行设置，否则引用时地址会错误，找不到文件
                    // 一般只设置output的publicPath，方便统一管理
                    limit: 1024                 // 限制当文件小于1KB的时候，就将文件转为base64存储于js中，以减少http请求次数，当文件大于1KB，则打包文件到指定目录，避免js过大
                }
            },
            {
                //处理其他文件
                exclude: /\.(js|css|less|html|jpg|png|gif|ttf)$/,
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
    },
    plugins: [
        //提取css为单独文件
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
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
    //mode为production，js就自动压缩了，但因为配置了optimization.minimizer，需要手动添加内部js压缩器
    mode: 'production'
}