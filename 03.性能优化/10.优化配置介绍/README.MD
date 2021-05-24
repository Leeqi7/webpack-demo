# webpack 性能优化

- 开发环境性能优化
- 生产环境性能优化

## 开发环境性能优化

- 优化打包构建速度
  - HMR 模块热替换
- 优化代码调试
  - source-map

## 生产环境性能优化

- 优化打包构建速度
  - oneOf
  - babel 缓存
  * 多进程打包 同一时间干多件事，提升打包速度，进程开启和交流也有开销，消耗时间比较长的任务，使用 thread-loader 对 babel-loader 进行优化
  * external 声明不用打包的库，再用 cdn 引进来
  * dll 第三方库不打包在一起，然后单独打包然后引入，要写 dll 文件和正常使用的配置文件
- 优化代码运行的性能
  - 缓存（hash-chunkhash-contenthash）
  * tree shaking （es6 模块，production）(package.json 中 sideEffects:['xxx'])
  * code split {单页面，单入口通过 import 引入的一定会被分割成单独的打包，optimization， 多页面，多入口，使用 dll 对第三方的库进行打包}
  * 懒加载/预加载
    代码分割是异步执行，使用懒加载
    预加载等其他资源加载完再加载，预加载兼容性问题大用之慎重
  * pwa 离线可访问，serviceworker 和 cache，使网络离线可访问，兼容性问题严重
  * 代码分割用 code split 加上 dll 一起使用
