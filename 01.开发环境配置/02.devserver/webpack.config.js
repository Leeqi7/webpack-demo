//const path = require('path');
//path.resolve(__dirname,'')

const {resolve} = require('path'); //两种引入使用方法等价
//resolve(__dirname,'')

const HtmlWebpackPlugin = require('html-webpack-plugin');

//const CleanWebpackPlugin = require('clean-webpack-plugin');

//const webpack = require('webpack');

// webpack默认是将css打包到js中,如果需要将css打包成单独文件，则需要引入它
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  //入口文件
  entry:'./src/index.js',
    //{app: ["./src/index.js", "webpack-dev-server/client?http://localhost:3000/"]},
  
  //出口
  output: {
    //输出的文件名
    filename: '[name].bundle.js',
    //输出的路径
    path: resolve(__dirname, 'dist'),
    //publicPath: "/",
    clean:true //清理旧文件
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 将css打包成单独文件
      // {
      //   test:/\.css$/,
      //   use:[
      //       // 'style-loader',  // mini-css-extract-plugin是将css打包成独立的文件，而style-loader是将css以<style>标签的方式插入样式，彼此存在冲突,所以需要注释掉。
      //       // 'css-loader'     //将 CSS 转化成 CommonJS 模块
      //       // MiniCssExtractPlugin.loader, // mini-css-extract-plugin是将css打包成独立的文件的插件
      //       {
      //         loader: MiniCssExtractPlugin.loader, // mini-css-extract-plugin是将css打包成独立的文件的插件
      //         options: {
      //           publicPath: './' // 设置publicPath，这样css引用的背景图url就会以css所在的文件为基础
      //         }
      //       },
      //       {
      //         loader: 'css-loader', //将 CSS 转化成 CommonJS 模块
      //         options: {
      //           import: true, // 启用/禁用 @import 处理
      //           // modules: true // 代表样式的模块化打包，即哪个js引入了样式，哪个js才会受这个样式作用，其他js不受此样式文件影响
      //                         // 但是这样会造成样式文件打包后，类名会变成hash值，造成样式不起作用，因此如果设置modules: true，组件中设置类名的方式则需要做调整，根据css文件类名的变化而变化
      //         }
      //       },
      //       'postcss-loader'  // 在css3新特性下，我们是要添加浏览器厂商前缀的。如果没有浏览器厂商前缀，同一套样式不同浏览器展现的样式是不同的。
      //   ]
      // },
      // 打包iconfont字体图标，和打包图片类似
      // {
      //   test:/\.ttf$/,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       esModule: false, // 新版本中esModule默认为true，会导致文件的地址变为[object Module],因此这里设置为false
      //       name: '[name]_[hash:1].[ext]', // 输出的文件名为[原名称]_[哈希值].[原后缀]
      //       outputPath: 'fonts/',       // 文件存储路径（output.path + 值）（物理路径, 存储路径）
      //                                   // 负责输出目录, 即打包后的写在磁盘的位置
      //       // publicPath: 'dist/fonts/',   // 输出解析文件的目录，url 相对于 HTML 页面（index.html所在文件夹的绝对路径 + 值）（文件引用路径就是看这个）
      //                                      // 如果output设置了publicPath， options也设置了publicPath，优先以options的publicPath为主
      //                                      // 是对页面引入资源的补充,比如img标签引入或者css引入等.
      //                                      // 千万不能设错，应该观察文件和HTML页面的存储地址位置，进行设置，否则引用时地址会错误，找不到文件
      //                                     // 一般只设置output的publicPath，方便统一管理
      //       limit: 1024                 // 限制当文件小于1KB的时候，就将文件转为base64存储于js中，以减少http请求次数，当文件大于1KB，则打包文件到指定目录，避免js过大
      //     }
      //   }
      // },
      //打包其他资源(除了html/js/css/less资源以外的资源)
      {
        //排除css/js/html资源
        exclude: /\.(css|js|html|less)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:10].[ext]',
          // publicPath:'./',    //公共路径
          // outputPath:'./',  //输出路径 
          // presets: [
          //   ['es2015', {modules: false}]
          // ]
        }
        // type: 'asset/resource',
        // generator: {
        //   filename: 'assets/[name].[hash:6].[ext]'
        // }
      }
    ]
  },
  devtool: 'inline-source-map',//错误追踪
  plugins: [
    // new MiniCssExtractPlugin({   // 如果需要将css打包成单独文件，则需要引入它
    //   filename: '[name].css', // 非必填，默认当前目录main.css，如指定路径和文件名可这样填写
    //   chunkFilename: '[id].css',  // 间接引入css的才会走chunk.filename
    // }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      //inject: 'head',
      scriptLoading: 'blocking'
    }),
    //new CleanWebpackPlugin()
  ],
  mode: 'development',
  target: 'web',//不加这个不能自动刷新
  //开发服务器 devServer 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  //特点：只会在内存中编译打包，不会有任何输出
  //启动devServer指令为：npx webpack-dev-server
  devServer: {
    publicPath: "/", // here's the change
    contentBase:resolve( __dirname,'dist'),
    //启动gzip压缩
    compress: true,
    //端口号
    port: 5000,
    //首次运行自动打开浏览器
    open:'Chrome'
  }
};
