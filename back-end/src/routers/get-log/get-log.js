import RP from '../../responseformat';
import checkAuth from '../../user-auth/check-auth';
import fs from 'fs';
import paths from '../../../configs/paths';
const { logFile } = paths;

function ConvertToTable(data) {
	data = data.toString();
	var table = new Array();
	var rows = new Array();
	rows = data.split('\n');
	const len = rows.length > 12 ? rows.length - 12 : rows.length;
	for (var i = rows.length - 2; i > len; i--) {
		table.push(rows[i].split(','));
	}
	return table;
}

/**
 * hello world
 *
 * @param {Server} app
 */
export const getLogHandle = function(token) {
	return checkAuth(token)
		.then((data) => {
			return RP.success({
				api: 'getLogHandle',
				user: data.user,
				data: { log: ConvertToTable(fs.readFileSync(logFile)) }
			});
		})
		.catch((err, user) => {
			return RP.error({
				api: 'getLogHandle',
				user: user,
				data: 'Authentication failed'
			});
		});
};

/**
 * getlog 
 * 
 * @param {Server} app
 */
export default function(app) {
	app.post('/getlog', (req, res) => {
		const requestData = Object.assign(req.query, req.body);
		const { token } = requestData;
		getLogHandle(token).then((d) => res.send(d)).catch((d) => res.send(d));
	});
}
