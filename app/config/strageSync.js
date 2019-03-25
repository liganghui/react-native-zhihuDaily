import {Api,Axios} from "./index";
// sync方法的名字必须和所存数据的key完全相同
// 方法接受的参数为一整个object，所有参数从object中解构取出
// 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
import axios from 'axios';

sync = {
    details(params) {
        let { id } = params;
        return Axios.get(Api.details + id).then(response => {
            return response.json();
        }).then(json => {
            console.warn('接受请求数据')
            console.warn(json)
            if (json && json.body) {
                global.storage.save({
                    key: 'details',
                    id,
                    data: json,
                });
                return json;
            } else {
               return null
            }
        }).catch(err => {
           return err;
        });
    },
    before(params) {
        let date = params.syncParams.extraFetchOptions.date || '';
        return Fetch(Api.before + date).then(response => {
            return response.json();
        }).then(json => {
            console.warn(json)
            if (json && json.data.stories) {
                global.storage.save({
                    key: 'before',
                    id: date,
                    data: json,
                });
                return json;
            } else {
               return null
            }
        }).catch(err => {
            return err
        });
    },
    latest(params) {
       return  Axios.get(Api.latest)
        .then(json => {
            if (json) {
                 // 设置数据过期时间 为5分钟
                //  expires: 1000 * 60 * 5,
                global.storage.save({
                    key: 'latest',
                    data: json,
                    expires:1000
                });
                return json
            } else {
                return null
            }
        }).catch(err => {
            console.warn('strangeSync数据请求错误')
            return err
        });

    }
}
exports.sync = sync;