// paths 文件 导出了一堆有用的路径信息

const path = require('path');

module.exports = {
	packageJson: path.resolve(__dirname, '../package.json'),
	mainjs: path.resolve(__dirname, '../src/server.js'),
	build: path.resolve(__dirname, '../build'),
	src: path.resolve(__dirname, '../src'),
	config: path.resolve(__dirname)
};
