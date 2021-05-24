import '../css/index.css'
// import '../css/index.less'
//import '../img/react.jpg'
// import '../fonts/iconfont.css'
// var tool = require('./add.js')

function sum(...args) {
    return args.reduce((p, c) => p + c, 0)
    
}
console.log(sum(1,2,3,4));
// console.log(tool.add(1, 2));
// console.log('indexjs测试');
// console.log(3333333333);