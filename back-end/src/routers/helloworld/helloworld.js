import RP from '../../responseformat';

/**
 * hello world
 *
 * @param {Server} app
 */
export default function(app) {
	app.get('/helloworld', (req, res) => {
		// const requestData = Object.assign(req.query, req.body);
		res.send(
			RP.success({
				api: 'helloworld',
				data: 'helloworld'
			})
		);
	});
}
