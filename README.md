## RN版知乎日报

知乎日报的 react-native 版本 , 用于日常使用和项目练习.    
<br/>


> ### 安装

    yarn  或者  npm install
     

> ### 运行  
    react-native run-android  或者 react-native run-ios
   注 : 应用启动后rn-fetch 会显示一些警告信息 ，此为组件自身问题 ，请无视 。 
 
> 运行前的修改

 由于  ```react-native-snap-carousel v3.8.0``` 中 ,  firstItem属性 存在问题 , 社区已给出解决方案 , 但还未同步到npm中  需要手动修改```node_modules```下的文件. 
   修改内容 :  [点击此处]( https://github.com/rtalwork/react-native-snap-carousel/commit/73261bbae26e753bb3c3c37bcd03dc8d35919fe1)
         [社区讨论]( https://github.com/archriss/react-native-snap-carousel/issues/538)
         
> IOS版本存在的问题

  由于我缺少IOS开发环境 , App没有在IOS环境下的测试过 . 建议先尝试运行Android版本 , 如要运行IOS版本 ,请先解决以下问题 .

  
  1.  [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker) 需要手动配置 , 请参考文档增加 ios 的配置 .

  2. [react-native-splash-screen(启动图)](https://github.com/crazycodeboy/react-native-splash-screen)  需要手动配置 , 请参考文档增加 ios 的配置 .

  3. 为应用更换IOS的图标和名称 (可选)
  
  > 极光推送与热更新功能(CodePush)

  代码包含 极光推送 和 CodePush热更新功能代码 , 但没有增加相关功能的依赖项配置 . 
  
  如要开启这两功能  请参考相关文档 , 配置依赖项与Key . 

  
<br/>
<br/>


> ### 运行演示   
<img  width="270" height="480" src="https://upload-images.jianshu.io/upload_images/2339090-d5cbb25e1fae5efa.gif?imageMogr2/auto-orient/strip"/> <img width="270" height="480" src="https://upload-images.jianshu.io/upload_images/2339090-6dad2aa89481e4cb.gif?imageMogr2/auto-orient/strip"/><img width="270" height="480" src="https://upload-images.jianshu.io/upload_images/2339090-31c7c8ea52162c36.gif?imageMogr2/auto-orient/strip"/><img width="270" height="480" src="https://upload-images.jianshu.io/upload_images/2339090-0bdba4e3ee275440.gif?imageMogr2/auto-orient/strip"/><img width="270" height="480" src="https://upload-images.jianshu.io/upload_images/2339090-88fe4383128547a8.gif?imageMogr2/auto-orient/strip"/><img width="270" height="480" src="https://upload-images.jianshu.io/upload_images/2339090-aa471f6aa4c72116.gif?imageMogr2/auto-orient/strip"/>      

<br/>
<br/>

> ### 参考文档

1. [项目概况](https://www.jianshu.com/p/8d7e6dd3c152)

2. [技术选型](https://www.jianshu.com/p/80ee11c12f53)

3. [目录结构与文件说明](https://www.jianshu.com/p/4cfc92ef0a30)

4. [页面功能实现](https://www.jianshu.com/p/0383c2e20bcf)

<br/>
<br/>


> ## 下载

 [Android版本](https://rink.hockeyapp.net/api/2/apps/5cf4cc3667854feb8088434dd7fc6715/app_versions/6?format=apk&avtoken=8e2b073d7b258cb862cd10e8aea1d25420634311&download_origin=hockeyapp&mctoken=dab91759e10ef3147789e51b70bab4c2abb45e55)    
<br/>
<br/>



> 

> ### 构建错误处理

 react-native-video 组件有些问题 ， 可能导致你无法构建项目  ，如以下方法无法解决 ， 你可以移除相关功能代码 。

> 执行```react-native  run-android ```  react-native-video 报错

 ```javascript
//  错误代码
Task :react-native-video:mergeDebugJniLibFolders FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':react-native-video:mergeDebugJniLibFolders'.

 ```
 解决方法 ：
  
  1. package.json 移除 react-native-video
  2. 注释 app/pages/Login/index 中有关 ```react-native-video``` 代码如下：
  ```javascript
//.....
import Video from "react-native-video"; 
//.....
  <Video                               
     style={styles.backgroundVideo}
     source={require("../../assets/video/login-background.mp4")}
     muted={this.state.muted}
     paused={this.state.paused}
     resizeMode="cover"
     ref={ref => {
        this.player = ref;
    }}
  />
  ```
  
3. 重新执行 react-native run-android 即可构建成功 ， 之后还原注释的代码 ，下次构建就不会报错了


> 执行 cd android  &&./gradlew assembleRelease 时 react-native-video 报错

  更换命令为  ```cd android  &&./gradlew.bat  assembleRelease```



