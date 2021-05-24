const HtmlWebpackPlugin = require("html-webpack-plugin");
const {resolve} = require('path')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bundles.js',
        path: resolve(__dirname, 'dist'),
        clean:true
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            //在这个插件中实现压缩html和环境无关 无需做兼容性处理
            minify: {
                //移除空格
                collapseWhitespace: true,
                //移除注释
                removeComments:true
            }
            
        })
    ],
    //生产环境下回自动压缩js代码
    mode:'production'
}