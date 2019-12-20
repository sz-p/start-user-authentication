import jwt from 'jsonwebtoken';
import secretOrPrivateKey from './key';
import loger from '../set-log/set-log';

export default function(payload) {
	loger(payload.user, 'createaToken', 'success');
	return jwt.sign(payload, secretOrPrivateKey, {
		expiresIn: 10 // 10秒钟过期
	});
}
