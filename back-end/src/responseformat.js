import loger from './set-log/set-log';

export default {
	success: function(msg) {
		loger(msg.user, `accessAPI:${msg.api}`, 'success');
		return {
			success: true,
			status: 0,
			api: msg.api,
			information: msg.infor,
			data: msg.data
		};
	},
	error: function(msg) {
		loger(msg.user, `accessAPI:${msg.api}`, 'error');
		return {
			success: false,
			status: -1,
			api: msg.api,
			information: msg.infor,
			data: msg.data
		};
	}
};
