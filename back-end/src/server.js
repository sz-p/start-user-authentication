import express from 'express';
import appConfig from '../configs/app.config';
import routers from './routers/routers';
import https from 'https';
import bodyParser from 'body-parser';

import fs from 'fs';

const { PORT } = appConfig;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '16mb', extended: false }));

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	//Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', 'http://localhost:3000');
	res.header('Content-Type', 'application/json;charset=utf-8');
	next();
});

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
