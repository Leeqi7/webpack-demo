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
        
    }

}