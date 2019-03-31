/**
 * Axios 配置 
 * 
 * 用于替代Fetch，请求数据。
 */
import axios from 'axios';
import {Tools} from "./tools";


const _Axios = axios.create({
    timeout: 4000, // 超时时间
    responseType: 'json', // 服务器响应的数据类型
    headers: {
        // 请求头 避免数据可能出现乱码
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
});
// 处理请求错误
const  errorHandler=(err)=>{
    let errData={
        status:null,
        message:null
    }
    if(!err.status){
        errData.status=0;
        errData.message='网络连接异常,请检查网络';
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
          errData.message = '网络连接超时'
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
          errData.message = '服务器异常'
            break
          case 504:
            err.message = '服务器连接超时'
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
              let errData=errorHandler(error)
              if (errData.message) {
                Tools.toast(errData.message);
                return Promise.reject(errData);//抛出异常信息
              } else {
                Tools.toast("更新失败，未知错误");
                return Promise.reject(error);
              }
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
                let errData=errorHandler(error)
                if (errData.message) {
                  Tools.toast(errData.message);
                  return Promise.reject(errData);
                } else {
                  Tools.toast("更新失败，未知错误");
                  return Promise.reject(error);
                }
            });
    }
};

export { Axios };