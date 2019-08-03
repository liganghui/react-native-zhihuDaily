## 知乎日报日用版本

    
  在主分支的版本基础上  调整侧边栏样式 , 移除包含 头像选择 , 模拟登录流程等对用户无用的功能 , 并在此基础上进一步扩展 , 方便日常使用 . 


运行  

     yarn install  
      
或

     npm install 
 
 注: 依赖中包含第三方个人版本依赖项 , 受网络影响 下载较慢 .  如无法下载请将Package.json中的 ```rn-fetch-blob```版本号设置为 0.10.15 , 此版本运行后会产生一些警告信息 ,可无视 .
 
 > 运行前的处理
    
 由于 react-native-snap-carousel 在当前 v3.8.0 下的[问题](https://github.com/archriss/react-native-snap-carousel/issues/538),  运行项目前需要删除该依赖项的部分代码 , 具体步骤请参考[此处](https://github.com/rtalwork/react-native-snap-carousel/commit/73261bbae26e753bb3c3c37bcd03dc8d35919fe1)
 
 注 : 如果您不处理 , 项目也可运行 但详情页的滑动翻页会出错 .
 
 
    react-native-android 或  ios 
    
