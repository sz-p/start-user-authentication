import RP from '../../responseformat';
import createAuth from '../../user-auth/create-auth';

const USER = 'user';
const PASSWORD = 'password';

/**
 * hello world
 *
 * @param {Server} app
 */
export const loginHandle = function(user, password) {
	return new Promise((resolve, reject) => {
		if (user === USER && password === PASSWORD) {
			const token = createAuth({ user: user });
			resolve(
				RP.success({
					user,
					api: 'login',
					data: { token }
				})
			);
		} else {
			reject(
				RP.error({
					user,
					api: 'login',
					data: 'password wrong'
				})
			);
		}
	});
};

/**
 * login 
 * 
 * @param {Server} app
 */
export default function(app) {
	app.post('/login', (req, res) => {
		const requestData = Object.assign(req.query, req.body);
		const { user, password } = requestData;
		loginHandle(user, password).then((d) => res.send(d)).catch((d) => res.send(d));
	});
}
