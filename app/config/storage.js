import Storage from 'react-native-storage';
import {
    AsyncStorage
} from 'react-native';
global.storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 200,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 7000 * 3600 * 24,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

});

// 如果storage中没有相应数据，或数据已过期，
// 则会调用相应的sync方法，无缝返回最新数据。
global.storage.sync = require('./strageSync').sync;