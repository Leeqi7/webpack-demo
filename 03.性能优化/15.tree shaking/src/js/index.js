import '../css/index.css'
import {mul} from './add'
// import '../css/index.less'
//import '../img/react.jpg'
// import '../fonts/iconfont.css'


function sum(...args) {
    return args.reduce((p, c) => p + c, 0)
    
}
console.log(sum(1,2,3,4));
console.log(mul(2, 2));
// console.log('indexjs测试');
// console.log(3333333333);