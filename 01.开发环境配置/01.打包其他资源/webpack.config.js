
const {resolve} = require('path'); 

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //入口文件
  entry: './src/index.js',
  //出口
  output: {
    //输出的文件名
    filename: '[name].bundle.js',
    //输出的路径
    path: resolve(__dirname, 'dist'),
    publicPath:"./"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      //打包其他资源(除了html/js/css/less资源以外的资源)
      {
        //排除css/js/html资源
        exclude: /\.(css|js|html|less)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:10].[ext]',
          publicPath:'./',    //公共路径
          outputPath:'./',  //输出路径 
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      scriptLoading: 'blocking' //去掉script defer模式
    })
  ],
  mode: 'development'
};
