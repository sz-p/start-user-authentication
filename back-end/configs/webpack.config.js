const paths = require('./paths');
module.exports = {
	mode: 'production',
	target: 'node',
	entry: paths.mainjs,
	output: {
		path: paths.build,
		filename: 'bundle.[hash:8].js'
	}
};
