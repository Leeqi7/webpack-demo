//resolve用来拼接绝对路径的方法
const {resolve} = require('path');

module.exports = {
	//webpack配置
	//入口起点
	entry:'./src/index.js',
	//输出
	output:{
		//输出文件名
		filename:'bundle.js',
		//输出路径
		//__dirname nodejs的变量，代表当前文件的目录绝对路径
		//输出到这个build文件夹中
        path: resolve(__dirname, 'dist'),
        clean:true
	},
	//loader的配置
	module:{
		rules:[
			//详细loader配置
			//不同文件必须配置不同loader处理
			{
				//匹配哪些文件
				test:/\.css$/,
				//使用哪些loader进行处理
				use:[
					//创建style标签，将js中的样式资源插入进行，添加到head中生效
					//下载style-loader
					'style-loader',
					//将css文件变成commonjs模块加载js中，里面内容是样式字符串
					//下载css-loader
					'css-loader'
				]
			},
			{
				test:/\.less$/,
				//使用哪些loader进行处理
				use:[
					//创建style标签，将js中的样式资源插入进行，添加到head中生效
					'style-loader',
					//将css文件变成commonjs模块加载js中，里面内容是样式字符串
					'css-loader',
					//将less文件编译成css文件
					//需要下载less-loader和less
					'less-loader'//包统一都在最外面下
				]
			}
		]
	},
	//plugins的配置
	plugins:[
		//详细plugins的配置
	],
	//模式
	mode:'development',//开发模式
	//mode:'production'
};