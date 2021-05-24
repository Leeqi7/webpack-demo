/**
 * HMR: hot module replacement 热模块替换 / 模块热替换
 * 作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块），极大提升构建速度
 * 使用 devServer中加上 hot:true
 * 样式文件：可以使用HMR功能 ，因为style-loader内部实现了，所以开发环境下用style-loader，但是生产环境下还是提取css为单独文件
 * js文件： 默认不能使用HMR功能 -->需要修改js代码，添加支持HMR功能的代码
 *   注意：HMR功能对js的处理，只能处理非入口js文件的其他文件
    if (module.hot) {
        //全局中寻找hot
        //一旦module.hot为true，说明开启了HMR功能。 -->让HMR功能代码生效
        module.hot.accept('./print.js', function () {
            //方法会监听print.js文件的变化，一旦发生变化，其他默认不会重新打包构建
            //会执行后面的回调函数
            print()
        })
    }
 * html文件： 默认不能使用HMR功能，同时会导致问题：html文件不能热更新了
 *    解决：修改entry入口，将html文件引入(html文件只有一个，不用做HMR功能)
 */


const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //入口文件
  entry:['./src/js/index.js','./src/index.html'],
  //出口
  output: {
    //输出的文件名
    filename: 'js/bundle.js',
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
  devtool: 'inline-source-map',//错误追踪
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      //inject: 'head',
      scriptLoading: 'blocking',
      title:'Hot Module Replacement'
    }),
  ],
  mode: 'development',
  target: 'web',
  //开发服务器 devServer 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  //特点：只会在内存中编译打包，不会有任何输出
  //启动devServer指令为：npx webpack-dev-server
  devServer: {
    contentBase: './dist',
    //启动gzip压缩
    compress: true,
    //端口号
    port: 8888,
    //首次运行自动打开浏览器
    open: 'Chrome',
    // 开启HMR功能
    //当修改了webpack配置，新配置要想生效必须重启webpack服务
    hot: true
    
  }
};
