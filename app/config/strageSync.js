import API from "./api";
import  Fly from "flyio";

// sync方法的名字必须和所存数据的key完全相同
// 方法接受的参数为一整个object，所有参数从object中解构取出
// 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
sync = {
    details(params) {
        let { id } = params;
        return Fly.get(API.details + id).then(response => {
            return response.json();
        }).then(json => {
            if (json && json.bodsssy) {
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
        return fetch(API.before + date).then(response => {
            return response.json();
        }).then(json => {
            if (json && json.stories) {
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
        return Fly.get(API.latest).then(response => {
            return response.json();
        }).then(json => {
            if (json) {
                global.storage.save({
                    key: 'latest',
                    data: json,
                    // 设置数据过期时间 为5分钟
                    expires: 1000 * 60 * 5,
                });
                return json;
            } else {
                return null
            }
        }).catch(err => {
            return err
        });

    }
}
exports.sync = sync;