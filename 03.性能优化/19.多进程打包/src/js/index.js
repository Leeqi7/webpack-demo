import '../css/index.css'
import { mul } from './add'
import '../css/index.less'
import '../fonts/iconfont.css'



function sum(...args) {
    return args.reduce((p, c) => p + c, 0)
    
}
console.log(sum(1,2,3,4));
console.log(mul(2, 2));
// console.log('indexjs测试');
// console.log(3333333333);

/**
 * 1.eslint 不认识window、navigator全局变量
 *  解决：需要修改package.json中eslintConfig配置
 *      "env"{
 *          "browser":true //支持浏览器端全局变量
 *      }
 * 2. serviceworker代码必须运行在服务器上
 *      --> nodejs
 *      -->
 *          npm i serve -g
 *          serve -s dist 启动服务器，将dist目录下所有资源作为静态资源暴露出去
 *  把网络设置为离线之后就可以在application中查看serviceworker中的文件了，使得网站可以离线访问
 * 注册serviceWorker
 * 处理兼容性问题
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(() => {
                console.log('sw注册成功了');
            })
            .catch(() => {
                console.log('sw注册失败了');
        })
    })
}