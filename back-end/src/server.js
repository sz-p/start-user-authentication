import express from 'express';
import appConfig from '../configs/app.config';
import routers from './routers/routers';
import https from 'https';
import fs from 'fs';

const { PORT } = appConfig;

const app = express();
routers.forEach((item, index) => {
	item(app);
});

// start listen
if (appConfig.HTTPS.enable) {
	const options = {
		key: fs.readFileSync(appDirectory + appConfig.HTTPS.keyPath),
		cert: fs.readFileSync(appDirectory + appConfig.HTTPS.certPath)
	};
	https.createServer(options, app).listen(PORT);
} else {
	app.listen(PORT);
}
