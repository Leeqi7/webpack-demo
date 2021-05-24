function sum(...args) {
    return args.reduce((p, c) => p + c, 0)
    
}
console.log(sum(1,2,3,4));
/**
 * 通过js代码，让某个文件被单独打包成一个chunk
 * import动态导入语法：能将某个文件单独打包
 */
import(/* webpackChunkName:'add' */'./add')
    .then(({ mul, count }) => {
        console.log('add文件加载成功');
        console.log("3+9=" + mul(3, 9));
        console.log("3-9="+count(3,9));
    })
    .catch(() => {
        console.log('文件加载失败');
    })