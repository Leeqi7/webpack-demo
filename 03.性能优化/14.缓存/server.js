/**
 * 服务器代码
 * 启动指令 node server.js
 * 使用nodemon server.js 需要全局安装nodemon npm i nodemon -g
 */
const express = require('express')
const app = express();

app.use(express.static('dist', { maxAge: 1000 * 3600 }));

app.listen(3000);
