/**
 * Axios 配置 
 * 
 * 用于替代Fetch，请求数据。
 */
import axios from 'axios';


const _Axios = axios.create({
    timeout: 5000, // 超时
    responseType: 'json', // 服务器响应的数据类型
    headers: {
        // 请求头 避免数据可能出现乱码
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
});

const Axios = {
    get: async(url, params, config) => {
        return _Axios({
                method: 'get',
                url: url,
                params,
                ...config
            })
            .then(data => {
                console.warn('打印请求数据!!!');
                console.warn(data);
                return data;
            })
            .catch(error => {
               return error;
            });
    },
    post: async(url, params, config) => {
        return _Axios({
                method: 'post',
                url: url,
                data: params,
                ...config
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                return error;
            });
    }
};

export { Axios };