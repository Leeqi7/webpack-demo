// import add from './add'
import count from './count'

console.log('index.js文件加载了');

//import引入add.js，将default信息重命名为add，add.js会被单独打包为一个chunk
import('./add').then(({ default: add }) => {
    console.log(add(1, 2));
})

console.log(count(7,2));