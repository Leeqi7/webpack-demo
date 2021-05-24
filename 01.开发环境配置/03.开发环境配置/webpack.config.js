const {resolve} = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //入口文件
  entry:'./src/index.js',
  //出口
  output: {
    //输出的文件名
    filename: '[name].bundle.js',
    //输出的路径
    path: resolve(__dirname, 'dist'),
    clean:true //清理旧文件
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader','less-loader']
      },
      {
        //处理图片资源(样式中的图片资源，html中的是处理不了的)
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader', //通过es6module解析
        options: {
            limit: 8 * 1024,
            name: '[name].[hash:10].[ext]',
            //关闭es6模块化，开启commonjs模块化
            esModule: false,
            outputPath:'img'
        }
    },
    {
        //处理html中的img资源
        test: /\.html$/,
        loader: 'html-loader',
        options: {
            esModule: false
        }
        
    },
    {
        //处理其他资源
        exclude: /\.(html|js|css|less|jpg|png|gif)$/,
        loader: 'file-loader',  //url-loader是基于file-loader封装的,多一些压缩功能，比如讲图片转成base64格式
        options: {
            name: '[name].[hash:10].[ext]',
            outputPath:'media'
        }
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      scriptLoading: 'blocking'
    }),
  ],
  mode: 'development',
  target: 'web',
  //开发服务器 devServer 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  //特点：只会在内存中编译打包，不会有任何输出
  //启动devServer指令为：npx webpack-dev-server  没有全局安装webpack这样启动
  devServer: {
    contentBase: resolve(__dirname, 'dist'), //另一种写法'./dist',
    //启动gzip压缩
    compress: true,
    //端口号
    port: 3000,
    //首次运行自动打开浏览器
    open:'Chrome'
  }
};
