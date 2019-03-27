/**
 * Axios 配置 
 * 
 * 用于替代Fetch，请求数据。
 */
import axios from 'axios';


const _Axios = axios.create({
    timeout: 4500, // 超时时间
    responseType: 'json', // 服务器响应的数据类型
    headers: {
        // 请求头 避免数据可能出现乱码
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
});
_Axios.defaults.retry = 2;//重试次数
_Axios.defaults.retryDelay = 1000;//重试延时
_Axios.defaults.shouldRetry = (error) => true;//重试条件，默认只要是错误都需要重试
_Axios.interceptors.response.use(undefined, (err) => {
    var config = err.config;
    // 判断是否配置了重试
    if(!config || !config.retry) return Promise.reject(err);

    if(!config.shouldRetry || typeof config.shouldRetry != 'function') {
       return Promise.reject(err);
    }
    //判断是否满足重试条件
    if(!config.shouldRetry(err)) {
      return Promise.reject(err);
    }
    // 设置重置次数，默认为0
    config.__retryCount = config.__retryCount || 0;
    // 判断是否超过了重试次数
    if(config.__retryCount >= config.retry) {
        return Promise.reject(err);
    }
    //重试次数自增
    config.__retryCount += 1;
    //延时处理
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    //重新发起axios请求
    return backoff.then(function() {
        return axios(config);
    });
});
// 处理请求错误
const  errorHandler=(err)=>{
    let errData={
        status:'',
        message:''
    }
    if(!err.status){
        errData.status=0;
        errData.message='网络错误';
    }else if (err && err.response) {
        errData.status=err.response.status;
        switch (err.response.status) {
          case 400:
          errData.message = '请求错误'
            break
          case 401:
          errData.message = '未授权，请登录'
            break
          case 403:
          errData.message = '拒绝访问'
            break
          case 404:
          errData.message = `请求地址出错: ${err.response.config.url}`
            break
          case 408:
          errData.message = '请求超时'
            break
          case 500:
          errData.message = '服务器内部错误'
            break
          case 501:
          errData.message = '服务未实现'
            break
          case 502:
          errData.message = '网络错误'
            break
          case 503:
          errData.message = '服务不可用'
            break
          case 504:
            err.message = '网络超时'
            break
          case 505:
          errData.message = 'HTTP协议不受支持'
            break
          default:
        }
    }
    return errData
}


const Axios = {
    get: async(url, params, config) => {
        return _Axios({
                method: 'get',
                url: url,
                params,
                ...config
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                return Promise.reject(errorHandler(error));
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
                return Promise.reject(errorHandler(error));
            });
    }
};

export { Axios };