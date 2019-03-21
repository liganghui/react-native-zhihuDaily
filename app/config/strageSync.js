import API from "./api";
// sync方法的名字必须和所存数据的key完全相同
// 方法接受的参数为一整个object，所有参数从object中解构取出
// 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
sync = {
    details(params) {
        let { id} = params;
        return fetch(API.details + id).then(response => {
            return response.json();
        }).then(json => {
            if (json&&json.body) {
                global.storage.save({
                    key: 'details',
                    id,
                    data: json,
                });
                return json;
            } else {
               return new Error(`JSON data parse error ID : ${id}`);
            }
        }).catch(err => {
            return  new Error(`data loading error ID : ${id}`);
        });
    }
}
exports.sync = sync;