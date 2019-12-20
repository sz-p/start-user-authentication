import axios from 'axios';

const baseURL = 'http://localhost:4000/';

export const base_Get_Rquest = async (url, params) => {
	try {
		const result = await axios.get(baseURL + url, params);
		return result.data;
	} catch (err) {
		return err;
	}
};

export const base_Post_Rquest = async (url, params) => {
	try {
		const result = await axios.post(baseURL + url, params);
		return result.data;
	} catch (err) {
		return err;
	}
};

/**
 * 登录
 *
 * @param {any} success
 * @param {any} error
 */
export const login_api = (data) => {
	return base_Post_Rquest('login', data);
};

/**
 * 获取所有项目数据
 *
 * @returns
 */
export const getLog_api = (data) => {
	return base_Post_Rquest('getlog', data);
};
