import jwt from 'jsonwebtoken';
import secretOrPrivateKey from './key';
import loger from '../set-log/set-log';

export default function(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secretOrPrivateKey, function(err, decode) {
			if (err) {
				//  时间失效的时候/ 伪造的token
				loger(decode.user, 'checkToken', 'error');
				reject(err, decode.user);
			} else {
				loger(decode.user, 'checkToken', 'success');
				resolve({ user: decode.user });
			}
		});
	});
}
