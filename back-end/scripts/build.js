process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

const webpack = require('webpack');
const config = require('../configs/webpack.config');
const paths = require('../configs/paths');
const fs = require('fs');

const compiler = webpack(config);

removeOldfiles();

// 错误回显
compiler.run((err, stats) => {
	let messages;
	if (err) {
		messages = {
			errors: [ err.message ]
		};
		console.log(messages);
	} else {
		messages = stats.toJson({ all: false, warnings: true, errors: true });
		createPackageJosn(Object.keys(stats.compilation.assets)[0]);
	}
	if (messages.errors.length) {
		if (messages.errors.length > 1) {
			messages.errors.length = 1;
		}
		console.log(new Error(messages.errors.join('\n\n')));
	}
});

function removeOldfiles() {
	const directoryList = [ paths.build ];

	while (directoryList.length) {
		let path = directoryList[0];
		let filse = fs.readdirSync(path);
		directoryList.shift();
		filse.forEach((item) => {
			if (fs.lstatSync(path + '/' + item).isDirectory() === true) {
				directoryList.push(path + item + '/');
			} else {
				fs.unlink(path + '/' + item, () => {});
			}
		});
	}
}

function createPackageJosn(bundleFileName) {
	const devPackageJson = require(paths.packageJson);
	let proPackageJson = {
		name: devPackageJson.name,
		version: devPackageJson.version,
		scripts: {
			start: `node ./${bundleFileName}`
		}
	};
	fs.writeFileSync(paths.build + '/package.json', JSON.stringify(proPackageJson, null, 2));
}
