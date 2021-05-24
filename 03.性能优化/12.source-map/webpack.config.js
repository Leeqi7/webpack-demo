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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      //inject: 'head',
      scriptLoading: 'blocking'
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
  },
  //devtool: 'source-map'  //生产环境选择
  devtool: 'eval-source-map' //开发环境选择
};
/**
 * source-map： 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射关系可以追踪源代码错误）
 * devtool:'source-map'基本配置
 * 还有几个可选参数： 
 * [inline-|hidden|eval-][nosources-][cheap-[module-]]source-map
 * 
 * source-map 外部
 *  错误代码的准确信息 和 源代码的错误位置
 * inline-source-map 内联 只生成一个内联source-map
 *  错误代码的准确信息 和 源代码的错误位置
 * hidden-source-map 外部 
 * 错误代码错误原因，但是没有错误位置
 * 不能追踪源代码错误，只能看到构建后代码的错误位置
 * eval-source-map 内联 每个文件后面追加一个source-map 在eval函数中
 *  错误代码的准确信息 和 源代码的错误位置，多一个hash值
 * nosources-source-map 外部
 * 错误代码的准确信息，但是没有任何源代码信息
 * cheap-source-map 外部
 * 错误代码的准确信息 和 源代码的错误位置
 * 只能精确到行，不能精确到列
 * cheap-module-source-map 外部
 * 错误代码的准确信息 和 源代码的错误位置
 * module会将loader的source map加入
 * 
 * 内联和外部的区别 ；1、外部生成了map文件，内联在bundle.js文件中 2、内联构建速度更快
 * 
 * 开发环境：速度快，调试更友好
 * 速度快（eval>inline>cheap>..）
 * eval-cheap-source-map 第一
 * eval-source-map 
 * 调试友好
 * source-map 第一
 * cheap-module-source-map 
 * cheap-source-map 
 * 
 * 又快又好 -- > eval-source-map / eval-cheap-module-source-map
 * 生产环境：源代码要不要隐藏？ 调试要不要更友好
 * 内联会让代码体积变大，所以在生产环境不用内联
 * 源代码隐藏
 * nosources-source-map 全部隐藏
 * hidden-source-map 只隐藏源代码，会提示构建后代码错误
 * -- > 调试友好 source-map / 速度快 cheap-module-source-map 
 */