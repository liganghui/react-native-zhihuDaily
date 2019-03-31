import {
    Api,
    Axios
} from "./index";
// sync方法的名字必须和所存数据的key完全相同
// 方法接受的参数为一整个object，所有参数从object中解构取出
// 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
sync = {
    details(params) {
        let {
            id
        } = params;
        return Axios.get(Api.details + id).then(json => {
            if (json && json.data.body) {
                global.storage.save({
                    key: 'details',
                    id,
                    data: json.data,
                    expires: null //数据不过期
                });
                return json.data;
            } else {
                return null
            }
        }).catch(err => {
            return Promise.reject(err);
        });
    },
    before(params) {
        // 获取额外的参数
        let {
            id
        } = params;
        return Axios.get(Api.before + id).then(json => {
            if (json && json.data.stories) {
                global.storage.save({
                    key: 'before',
                    id: id,
                    data: json.data,
                    expires: null //数据不过期
                });
                return json.data;
            } else {
                return null
            }
        }).catch(err => {
            return Promise.reject(err);
        });
    },
    latest(params) {
        return Axios.get(Api.latest).then(json => {
            if (json && json.data.date) {
                global.storage.save({
                    key: 'latest',
                    data: json.data,
                    // 设置数据过期时间(毫秒)
                    expires: 1000,
                });
                return json.data
            } else {
                return null
            }
        }).catch(err => {
            return Promise.reject(err);
        });

    }
}
exports.sync = sync;