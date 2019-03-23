import API from "./api";
// sync方法的名字必须和所存数据的key完全相同
// 方法接受的参数为一整个object，所有参数从object中解构取出
// 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
sync = {
    details(params) {
        let { id } = params;
        return fetch(API.details + id).then(response => {
            return response.json();
        }).then(json => {
            if (json && json.date) {
                global.storage.save({
                    key: 'details',
                    id,
                    data: json,
                });
                return json;
            } else {
                return new Error(`detail JSON data parse error param : ${id}`);
            }
        }).catch(err => {
            return new Error(`detail data loading error param : ${id}`);
        });
    },
    before(params) {
        let date = params.syncParams.extraFetchOptions.date || '';
        console.warn(date)
        return fetch(API.before + date).then(response => {
            return response.json();
        }).then(json => {
            console.warn(json)

            if (json && json.stories) {
                global.storage.save({
                    key: 'before',
                    id: date,
                    data: json,
                });
                return json;
            } else {
                return new Error(`before JSON data parse error param : ${date}`);
            }
        }).catch(err => {
            return new Error(`before data loading error param : ${date}`);
        });
    },
    latest(params) {
        return fetch(API.latest).then(response => {
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
                return new Error(`latest JSON data parse error param`);
            }
        }).catch(err => {
            return new Error(`latest data loading error param`);
        });

    }
}
exports.sync = sync;