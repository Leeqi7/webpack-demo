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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development',
    //解析模块的规则
    resolve: {
        //配置解析模块的路径别名：优点：简写路径，缺点：路径没有提示
        alias: {
            $css: resolve(__dirname, 'src/css') //$css 这个变量的值是'src/css'的绝对路径
            
        },
        /**
         * 配置省略文件路径的后缀名 
         * 优点：提高开发效率 
         * 缺点：默认有js和json，如果文件同名，优先找第一个js文件
         */
        extensions: ['js', 'json', 'css', 'jsx'],
        /**
         * 告诉webpack 解析模块是去哪儿找哪个目录
         * 不用一层一层去找
         */
        modules:[resolve(__dirname,'../../node_modules'),'node_modules']
        
    },
    devServer: {
        //运行代码的目录
        contentBase: resolve(__dirname, 'dist'),
        //监视contentBase目录下的所有文件，一旦文件变化就会reload
        watchContentBase: true,
        
        watchOptions: {
            //忽略一些文件
            ignored: /node_modules/
        },
        //启动gzip压缩
        compress: true,
        //端口号
        port: 5000,
        //域名
        host: 'loacalhost',
        //自动打开浏览器
        open: true,
        //开启HMR功能
        hot: true,
        //不要显示启动服务器日志信息
        clientLogLevel: 'none',
        //除了一些基本的启动信息意外，其他内容都不要显示
        quiet: true,
        //如果出错了不要全屏提示
        overlay: false,
        /**
         * 服务器代理 --> 解决开发环境跨域问题
         * 正常浏览器和服务器通信的时候是存在跨域问题的，
         * 同源策略：域名、端口号、协议名不一样就会产生跨域
         * 服务器和服务器之间是没有跨域的，我们的代码通过代理服务器运行，浏览器和代理服务器之间是没有跨域的，浏览器将请求发送到代理服务器上
         * 代理服务器转发到另一个服务器上，所以请求成功，代理服务器再把响应到的信息转发给浏览器，解决开发环境下的跨域问题
         */
        proxy: {
            //一旦devServer（5000）服务器接收到/api/xxx的请求，就会把请求转发到另一个服务器（3000）
            '/api': {
                target: 'http://localhost:3000',
                //发送请求时，请求路径重写：将/api/xxx --> /xxx （去掉api）
                pathRewrite: {
                    '^/api':''
                }
            }
        }
    }

}