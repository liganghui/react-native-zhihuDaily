/**
 * Axios 配置
 *
 * 用于替代Fetch，请求数据。
 */
import axios from 'axios';
import {Tools} from './tools';

const _Axios = axios.create({
  timeout: 4000, // 超时时间
  responseType: 'json', // 服务器响应的数据类型
  headers: {
    // 请求头 避免数据可能出现乱码
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});

const Axios = {
  get: async (url, params, config, errorCallback) => {
    return _Axios({
      method: 'get',
      url: url,
      params,
      ...config,
    })
      .then(data => {
        return data;
      })
      .catch(error => {
        let errData = errorHandler(error);
        if (errorCallback) {
          errorCallback(errData);
        } else {
          if (errData.message) {
            Tools.toast(errData.message);
            return Promise.reject(errData); //抛出异常信息
          } else {
            Tools.toast('未知错误，错误码：' + errData.status);
            return Promise.reject(error);
          }
        }
      });
  },
  post: async (url, params, config, errorCallback) => {
    return _Axios({
      method: 'post',
      url: url,
      data: params,
      ...config,
    })
      .then(data => {
        return data;
      })
      .catch(error => {
        let errData = errorHandler(error);
        if (errorCallback) {
          errorCallback(errData);
        } else {
          if (errData.message) {
            Tools.toast(errData.message);
            return Promise.reject(errData); //抛出异常信息
          } else {
            Tools.toast('未知错误，错误码：' + errData.status);
            return Promise.reject(error);
          }
        }
      });
  },
};
// 处理请求错误
const errorHandler = err => {
  let errData = {
    status: null,
    message: null,
  };
  if (!err || !err.request.status) {
    errData.status = 0;
    errData.message = '网络连接异常';
  } else if (err && err.request) {
    errData.status = err.request.status;
    switch (err.request.status) {
      case 400:
        errData.message = '请求错误';
        break;
      case 401:
        errData.message = '未授权，请登录';
        break;
      case 403:
        errData.message = '服务器拒绝访问';
        break;
      case 404:
        // errData.message = `服务器地址无法访问: ${err.response.config.url}`
        errData.message = '服务器异常，请稍后重试';
        break;
      case 408:
        errData.message = '网络连接超时';
        break;
      case 500:
        errData.message = '服务器内部错误';
        break;
      case 501:
        errData.message = '服务未实现';
        break;
      case 502:
        errData.message = '网络错误';
        break;
      case 503:
        errData.message = '服务器异常';
        break;
      case 504:
        err.message = '服务器连接超时';
        break;
      case 505:
        errData.message = 'HTTP协议不受支持';
        break;
      default:
        errData.message = '';
    }
  }
  return errData;
};

export {Axios};
