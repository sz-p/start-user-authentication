import fs from 'fs';
import paths from '../../configs/paths';
const { logFile } = paths;

export default function(user, action, status) {
	const logText = `${user},${new Date()},${action},${status}\n`;
	fs.writeFileSync(logFile, logText, { flag: 'a' });
}
