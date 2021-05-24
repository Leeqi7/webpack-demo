const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'dist'),
        clean: true, //清理旧文件
        chunkFilename:'js/[name].[contenthash:10]_chunk.js'
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
    mode: 'production',
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
    optimization: {
        //参考 [官方文档splitChunks](https://webpack.js.org/plugins/split-chunks-plugin/)
        splitChunks: {
            chunks: 'all', // all（所有类型的chunks）、async、initial
            /* 默认值可以不写
            minSize: 30 * 1024, //分割的chunk最小最30kb
            maxSize: 0, //最大没有限制
            minChunks: 1, //要提取的chunk最少被引用一次
            maxAsyncRequests: 30, //按需加载时并行加载的文件的最大数量为30
            minInitialRequests: 30, //入口js文件最大并行请求数量
            automaticNameDelimiter:'~', //webpack使用块的来源和名称生成名称（例如vendors~main.js），此项指定生成名称的连接符
            name:true, // 可以使用命名规则
            cacheGroups: { //分割chunk的组
                //node_modules文件会被打包到 defaultVendors组的chunk中 --> defaultVendors~xxx.js
                //满足上面的公共规则：如：大小超过30kb，至少被引用一次...
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    //优先级
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    //要引用的chunk最少被引用两次
                    minChunks: 2,
                    //优先级比-10低
                    priority: -20,
                    //如果当前要打包的模块和之前已经被提取的模块是同一个，就会代码复用，而不是重新打包模块
                    reuseExistingChunk: true,
                },
            },
            */
        },
        //参考 [官方文档runtimeChunk](https://webpack.js.org/configuration/optimization/#optimizationruntimechunk)
        //将当前模块的记录其他模块的hash单独打包为一个文件 runtime
        //解决：修改a文件导致b文件的contenthash变化，提取公共代码导致缓存失效
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`

        },
        minimize: true,
        minimizer: [
            //配置生产环境的压缩方案：js和css
            new TerserWebpackPlugin({
                //参考[官方文档optimization](39节，配置完minimizer之后打包出错，因为webpack5TerserWebpackPlugin中不支持cache和sourceMap参数，注释这两项就不报错了，具体的使用：详见https://webpack.js.org/configuration/optimization/#optimizationruntimechunk)
                //开启缓存
                // cache: true,
                //开启多进程打包
                parallel: true,
                //启动source-map
                // sourceMap: true,
                // terserOptions: {
                //  https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                // },

            })
        ]
    }

}